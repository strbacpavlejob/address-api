import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/saleschamp'),
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
