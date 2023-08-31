import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Bitcoin } from './model/Bitcoin';

@Controller('bitcoin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getBitcoinData();
  }

  @Post('many-month')
  postManyMonthData(@Body() data: Bitcoin[]) {
    return this.appService.createManyMonthBitcoinData(data);
  }

  @Post('many-day')
  postManyDayData(@Body() data: Bitcoin[]) {
    return this.appService.createManyDayBitcoinData(data);
  }

  @Post()
  postData(@Body() data: Bitcoin) {
    return this.appService.createBitcoinData(data);
  }

  @Delete(':id')
  deleteInfo(@Param() id: string) {
    return this.appService.deleteBitcoinData(id);
  }
}
