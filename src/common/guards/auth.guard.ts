import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtProvider } from '../providers/jwt.provider';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtProvider: JwtProvider,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    const user = this.jwtProvider.verify(token);

    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }
}
