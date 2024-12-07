import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '../prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, OrdersModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
