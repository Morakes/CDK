import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWechatUserDto } from './dto/create-wechat-user.dto';
import { UpdateWechatUserDto } from './dto/update-wechat-user.dto';
import axios from 'axios';

@Injectable()
export class WechatService {
  constructor(private prisma: PrismaService) {}

  private readonly appId = process.env.WX_APPID;
  private readonly appSecret = process.env.WX_SECRET;

  async login(createWechatUserDto: CreateWechatUserDto) {
    const { code } = createWechatUserDto;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appId}&secret=${this.appSecret}&js_code=${code}&grant_type=authorization_code`;

    try {
      const response: { data: Record<'openid' | 'session_key', string> } =
        await axios.get(url);
      const { openid, session_key } = response.data;

      // 查找或创建用户
      const user = await this.prisma.wechatUser.upsert({
        where: { openid },
        update: { sessionKey: session_key },
        create: {
          openid,
          sessionKey: session_key,
        },
      });

      return user;
    } catch (error) {
      throw new Error('微信登录失败');
    }
  }

  findAll() {
    return this.prisma.wechatUser.findMany();
  }

  findOne(id: number) {
    return this.prisma.wechatUser.findUnique({
      where: { id },
    });
  }

  update(id: number, updateWechatUserDto: UpdateWechatUserDto) {
    return this.prisma.wechatUser.update({
      where: { id },
      data: updateWechatUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.wechatUser.delete({
      where: { id },
    });
  }
}
