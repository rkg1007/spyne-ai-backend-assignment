import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(registerUserDto: any) {
    return this.authRepository.register(registerUserDto);
  }
}
