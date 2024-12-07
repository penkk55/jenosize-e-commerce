import {
  Controller,
  Get,
  Headers,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Endpoint } from 'src/constants/endpoint';

@Controller(Endpoint.ApiV1)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/register')
  async register(
    @Body() { email, password }: { email: string; password: string },
  ) {
    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }
    return await this.customersService.register({ email, password });
  }

  @Post('/login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }
    return await this.customersService.login({ email, password });
  }
}
