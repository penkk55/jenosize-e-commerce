import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Endpoint } from 'src/constants/endpoint';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller(Endpoint.ApiV1 + 'products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('offset') offset = 1, @Query('limit') limit = 10) {
    offset = parseInt(offset as any);
    limit = parseInt(limit as any);
    return this.productsService.findAll(offset, limit);
  }
}
