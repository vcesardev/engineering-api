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

  async getBitcoinData() {
    return await this.bitcoinModel.find();
  }

  async createManyBitcoinData(data: Bitcoin[]) {
    return await this.bitcoinModel.insertMany(data);
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
