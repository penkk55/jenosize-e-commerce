import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Headers,
  Req,
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
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    return this.ordersService.createOrder(createOrderDto, req.user);
  }

  @Get()
  findAll() {
    return this.ordersService.getOrders();
  }

  @Get('/:orderId')
  findOne(@Param('orderId') id: string) {
    return this.ordersService.findOne(id);
  }
}
