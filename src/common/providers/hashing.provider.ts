import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashingProvider {
  private readonly saltRounds: number;

  constructor(private readonly configService: ConfigService) {
    this.saltRounds = +this.configService.get<number>('SALT_ROUNDS');
  }

  async hash(data: string) {
    return bcrypt.hash(data, this.saltRounds);
  }

  async compare(data: string, hash: string) {
    return bcrypt.compare(data, hash);
  }
}
