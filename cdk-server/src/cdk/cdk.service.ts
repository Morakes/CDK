import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCdkDto } from './dto/create-cdk.dto';
import { UpdateCdkDto } from './dto/update-cdk.dto';

@Injectable()
export class CdkService {
  constructor(private prisma: PrismaService) {}

  async create(createCdkDto: CreateCdkDto) {
    const { gameId, ...cdkData } = createCdkDto;

    // 检查是否存在相同的兑换码
    const existingCdk = await this.prisma.cDK.findFirst({
      where: { code: cdkData.code },
    });

    if (existingCdk) {
      console.warn('兑换码已存在，请使用其他兑换码');
      return '兑换码已存在，请使用其他兑换码';
    }

    const cdk = await this.prisma.cDK.create({
      data: {
        ...cdkData,
        gameId: gameId,
        endTime: cdkData.endTime
          ? new Date(cdkData.endTime)
          : new Date('2099-12-31'),
      },
      select: {
        id: true,
        code: true,
        title: true,
        reward: true,
        endTime: true,
        isValid: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return {
      ...cdk,
      endTime: cdk.endTime ? cdk.endTime.toISOString().split('T')[0] : null,
      createdAt: cdk.createdAt.toISOString().split('T')[0],
      updatedAt: cdk.updatedAt.toISOString().split('T')[0],
    };
  }

  async findAll() {
    const cdks = await this.prisma.cDK.findMany({
      select: {
        id: true,
        code: true,
        title: true,
        reward: true,
        endTime: true,
        isValid: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return cdks.map((cdk) => ({
      ...cdk,
      endTime: cdk.endTime ? cdk.endTime.toISOString().split('T')[0] : null,
      createdAt: cdk.createdAt.toISOString().split('T')[0],
      updatedAt: cdk.updatedAt.toISOString().split('T')[0],
    }));
  }

  async findOne(id: number) {
    const cdk = await this.prisma.cDK.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        title: true,
        reward: true,
        endTime: true,
        isValid: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!cdk) {
      throw new Error('CDK不存在');
    }
    return {
      ...cdk,
      endTime: cdk.endTime ? cdk.endTime.toISOString().split('T')[0] : null,
      createdAt: cdk.createdAt.toISOString().split('T')[0],
      updatedAt: cdk.updatedAt.toISOString().split('T')[0],
    };
  }

  async findByGame(gameId: number) {
    const cdks = await this.prisma.cDK.findMany({
      where: { gameId },
      select: {
        id: true,
        code: true,
        title: true,
        reward: true,
        endTime: true,
        isValid: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return cdks.map((cdk) => ({
      ...cdk,
      endTime: cdk.endTime ? cdk.endTime.toISOString().split('T')[0] : null,
      createdAt: cdk.createdAt.toISOString().split('T')[0],
      updatedAt: cdk.updatedAt.toISOString().split('T')[0],
    }));
  }

  async update(id: number, updateCdkDto: UpdateCdkDto) {
    const { code, title, reward, endTime, isValid } = updateCdkDto;
    const data = {
      code,
      title,
      reward,
      isValid,
      endTime: endTime ? new Date(endTime) : new Date('2099-12-31'),
    };

    const cdk = await this.prisma.cDK.update({
      where: { id },
      data: {
        code: data.code,
        title: data.title,
        reward: data.reward,
        isValid: data.isValid,
        endTime: data.endTime,
      },
      select: {
        id: true,
        code: true,
        endTime: true,
        gameId: true,
        isValid: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return {
      ...cdk,
      endTime: cdk.endTime ? cdk.endTime.toISOString().split('T')[0] : null,
      createdAt: cdk.createdAt.toISOString().split('T')[0],
      updatedAt: cdk.updatedAt.toISOString().split('T')[0],
    };
  }

  async createBatch(gameId: number, createCdkDtos: CreateCdkDto[]) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      throw new Error('游戏不存在');
    }

    // 检查是否有重复的兑换码
    const codes = createCdkDtos.map((dto) => dto.code);
    const existingCdks = await this.prisma.cDK.findMany({
      where: {
        code: {
          in: codes,
        },
      },
      select: {
        code: true,
      },
    });

    if (existingCdks.length > 0) {
      const duplicateCodes = existingCdks.map((cdk) => cdk.code).join(', ');
      console.warn(`以下兑换码已存在：${duplicateCodes}`);
    }

    // 过滤掉已存在的兑换码
    createCdkDtos = createCdkDtos.filter(
      (dto) => !existingCdks.some((cdk) => cdk.code === dto.code),
    );

    const createdCdks = await Promise.all(
      createCdkDtos.map((dto) => {
        return this.prisma.cDK.create({
          data: {
            code: dto.code,
            title: dto.title,
            reward: dto.reward,
            gameId,
            endTime: dto.endTime
              ? new Date(dto.endTime)
              : new Date('2099-12-31'),
            isValid: true,
          },
          select: {
            id: true,
            code: true,
            endTime: true,
            gameId: true,
            isValid: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      }),
    );

    return createdCdks.map((cdk) => ({
      ...cdk,
      endTime: cdk.endTime ? cdk.endTime.toISOString().split('T')[0] : null,
      createdAt: cdk.createdAt.toISOString().split('T')[0],
      updatedAt: cdk.updatedAt.toISOString().split('T')[0],
    }));
  }

  remove(id: number) {
    return this.prisma.cDK.delete({
      where: { id },
    });
  }
}
