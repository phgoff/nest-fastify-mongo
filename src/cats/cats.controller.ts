import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cat')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Cat> {
    return this.catService.findOne(name);
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return this.catService.update(name, updateCatDto);
  }

  @Delete(':name')
  async remove(@Param('name') name: string): Promise<{ deleted: boolean }> {
    try {
      const result = await this.catService.remove(name);
      return result;
    } catch (error) {
      throw new HttpException('Badrequest', HttpStatus.BAD_REQUEST);
    }
  }
}
