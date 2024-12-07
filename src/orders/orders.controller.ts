import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Endpoint } from 'src/constants/endpoint';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller(Endpoint.ApiV1 + 'orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Request() req: Request) {
    console.log('req.user', req['user']);

    return req['user'];
    // return this.ordersService.findAll();
  }
}
