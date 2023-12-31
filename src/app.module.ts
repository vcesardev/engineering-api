import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BitcoinSchema } from './model/Bitcoin';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vitordev:bitcoin123@cluster0.muupqh8.mongodb.net/',
    ),
    MongooseModule.forFeature([
      {
        name: 'Bitcoin',
        schema: BitcoinSchema,
      },
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
