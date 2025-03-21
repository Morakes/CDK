import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WechatService } from './wechat.service';
import { CreateWechatUserDto } from './dto/create-wechat-user.dto';
import { UpdateWechatUserDto } from './dto/update-wechat-user.dto';

@Controller('wechat')
export class WechatController {
  constructor(private readonly wechatService: WechatService) {}

  @Post('login')
  login(@Body() createWechatUserDto: CreateWechatUserDto) {
    return this.wechatService.login(createWechatUserDto);
  }

  @Get('users')
  findAll() {
    return this.wechatService.findAll();
  }

  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.wechatService.findOne(+id);
  }

  @Patch('users/:id')
  update(
    @Param('id') id: string,
    @Body() updateWechatUserDto: UpdateWechatUserDto,
  ) {
    return this.wechatService.update(+id, updateWechatUserDto);
  }

  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.wechatService.remove(+id);
  }
}
