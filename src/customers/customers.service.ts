import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly jwtSecret = process.env.JWT_SECRET;
  async register({ email, password }: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        balance: 0,
        name: email,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return { id: user.id, email: user.email }; // Don't return the password
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.prisma.customer.findUnique({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {
      expiresIn: '1h',
    });
    return { token };
  }
}
