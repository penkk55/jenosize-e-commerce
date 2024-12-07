import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }
  async validateRequest(request: any) {
    const token = request.headers['authorization'];
    if (!token) {
      return false;
    }
    const tokenSplit = token.split(' ');
    if (tokenSplit.length !== 2) {
      return false;
    }
    const [scheme, credentials] = tokenSplit;

    if (/^Bearer$/i.test(scheme)) {
      const decoded = this.decodeToken(credentials);

      if (!decoded) {
        return false;
      }

      const prisma = new PrismaService();

      const user = await prisma.customer.findUnique({
        where: {
          email: decoded.email,
        },
      });
      if (!user) {
        throw new UnauthorizedException({
          message: 'Invalid credentials',
          statusCode: 401,
          error: user,
        });
      }
      request.user = user;
      return true;
    }
    return false;
  }
  decodeToken(token: string) {
    try {
      // Verify and decode the JWT using your secret key
      return jwt.decode(token);
    } catch (e) {
      console.error('Failed to decode token:', e.message);
      return false;
    }
  }
}
