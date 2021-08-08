import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async findOne(name: string): Promise<Cat> {
    return await this.catModel.findOne({ name }).exec();
  }

  async update(name: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    try {
      const foundCat = await this.catModel
        .findOneAndUpdate({ name }, updateCatDto)
        .exec();
      return foundCat;
    } catch (error) {
      return error;
    }
  }

  async remove(name: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.catModel.deleteOne({ name });
      return { deleted: true };
    } catch (error) {
      return { deleted: false, message: error.message };
    }
  }
}
