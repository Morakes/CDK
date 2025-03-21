import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CdkService } from './cdk.service';
import { CreateCdkDto } from './dto/create-cdk.dto';
import { UpdateCdkDto } from './dto/update-cdk.dto';

@Controller('cdk')
export class CdkController {
  constructor(private readonly cdkService: CdkService) {}

  @Post()
  create(@Body() createCdkDto: CreateCdkDto) {
    return this.cdkService.create(createCdkDto);
  }

  @Post('batch/:gameId')
  async createBatch(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() createCdkDtos: CreateCdkDto[],
  ) {
    return this.cdkService.createBatch(gameId, createCdkDtos);
  }

  @Get()
  findAll() {
    return this.cdkService.findAll();
  }

  @Get('game')
  async findByGame(@Query('gameId') gameId: string) {
    try {
      const numId = parseInt(gameId);
      if (isNaN(numId)) {
        throw new Error('无效的游戏ID格式');
      }
      return await this.cdkService.findByGame(numId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const numId = parseInt(id);
      if (isNaN(numId)) {
        throw new Error('无效的ID格式');
      }
      return await this.cdkService.findOne(numId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCdkDto: UpdateCdkDto) {
    return this.cdkService.update(+id, updateCdkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cdkService.remove(+id);
  }
}
