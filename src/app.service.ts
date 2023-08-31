import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Bitcoin } from './model/Bitcoin';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Bitcoin')
    private readonly bitcoinModel: mongoose.Model<Bitcoin>,
  ) {}

  async getBitcoinData(type: 'month' | 'day') {
    return await this.bitcoinModel.find({
      type: type,
    });
  }

  async createManyMonthBitcoinData(data: Bitcoin[]) {
    const updatedInfoData: Bitcoin[] = data.map((info) => {
      const updatedInfo = { ...info, type: 'month' };
      return updatedInfo;
    });
    return await this.bitcoinModel.insertMany(updatedInfoData);
  }

  async createManyDayBitcoinData(data: Bitcoin[]) {
    const updatedInfoData: Bitcoin[] = data.map((info) => {
      const updatedInfo = { ...info, type: 'day' };
      return updatedInfo;
    });
    return await this.bitcoinModel.insertMany(updatedInfoData);
  }

  async createBitcoinData(data: Bitcoin) {
    try {
      const register = await this.bitcoinModel.findOne({
        time_period_start: data.time_period_start,
      });
      if (register) {
        throw new BadRequestException('Register already exists.');
      } else {
        return await this.bitcoinModel.create(data);
      }
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async deleteBitcoinData(id: string) {
    return await this.bitcoinModel.findByIdAndDelete(
      new mongoose.Types.ObjectId(id),
    );
  }
}
