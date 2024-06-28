import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtProvider {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: any) {
    return this.jwtService.sign(payload);
  }

  async verify(token: string) {
    return this.jwtService.verify(token);
  }
}
