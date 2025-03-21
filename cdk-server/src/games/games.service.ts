import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import OpenAI from 'openai';
import { CreateCdkDto } from 'src/cdk/dto/create-cdk.dto';

@Injectable()
export class GamesService {
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: '',
    });
  }

  create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: createGameDto,
    });
  }

  findAll() {
    return this.prisma.game.findMany({
      include: {
        cdkList: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.game.findUnique({
      where: { id: id },
      include: {
        cdkList: true,
      },
    });
  }

  findByName(name: string) {
    return this.prisma.game.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        cdkList: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.game.delete({
      where: { id },
    });
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    const { name, cover } = updateGameDto;
    return this.prisma.game.update({
      where: { id },
      data: {
        name,
        cover,
      },
    });
  }

  async generateGameCdks(id: number) {
    const game = await this.prisma.game.findUnique({
      where: { id },
      include: {
        cdkList: true,
      },
    });

    if (!game) {
      throw new Error('游戏不存在');
    }

    // 构建提示信息
    const prompt = `你是一个游戏兑换码搜索大师，请根据网络上的最新信息，搜索游戏《${game.name}》最新兑换码，要求：
1. 只返回纯JSON数组格式，不要包含任何其他说明文本或markdown标记
2. 数组中的每个对象必须包含以下字段：
   - code: 兑换码（尽可能使用真实的兑换码格式）
   - title: 兑换码名称（如：开服兑换码，前瞻直播兑换码，情人节兑换码）
   - reward: 根据游戏类型和最新活动提供合理的奖励内容
   - endTime: 有效期（YYYY-MM-DD格式，长期有效则填写"不限期"
3. 兑换码只能来自于官服，渠道服则无需录入`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'qwen-plus',
        messages: [
          { role: 'system', content: '你是一个只输出JSON格式数据的API' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
        // @ts-expect-error
        enable_search: true,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('AI返回的内容为空');
      }

      let generatedCdks: CreateCdkDto[];
      try {
        // 尝试直接解析返回的内容
        generatedCdks = JSON.parse(content.trim()) as CreateCdkDto[];
        if (!Array.isArray(generatedCdks)) {
          throw new Error('返回的数据格式不是数组');
        }
      } catch (parseError) {
        // 如果直接解析失败，尝试提取JSON部分
        const jsonMatch = content.match(/\[\s*{[\s\S]*}\s*\]/);
        if (!jsonMatch) {
          console.error('无法提取JSON数据:', content);
          throw new Error('无法从AI返回的内容中提取有效的JSON数据');
        }
        generatedCdks = JSON.parse(jsonMatch[0]) as CreateCdkDto[];
      }

      // 将生成的兑换码保存到数据库
      const createdCdks = await Promise.all(
        generatedCdks.map((cdk) => {
          return this.prisma.cDK.create({
            data: {
              code: cdk.code,
              title: cdk.title,
              reward: cdk.reward,
              endTime: cdk.endTime || '2099-12-31',
              isValid: true,
              gameId: id,
            },
          });
        }),
      );

      return createdCdks;
    } catch (error) {
      throw new Error(`AI生成兑换码失败: ${error.message}`);
    }
  }
}
