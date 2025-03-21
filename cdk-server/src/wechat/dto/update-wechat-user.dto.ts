import { PartialType } from '@nestjs/mapped-types';
import { CreateWechatUserDto } from './create-wechat-user.dto';

export class UpdateWechatUserDto extends PartialType(CreateWechatUserDto) {}
