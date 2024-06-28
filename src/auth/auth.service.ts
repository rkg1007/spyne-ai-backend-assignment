import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { HashingProvider } from 'src/common/providers/hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly hashingProvider: HashingProvider,
  ) {}

  async register(registerUserDto: any) {
    const { email, phone, password } = registerUserDto;

    const existingUser = await this.authRepository.getUser(email, phone);
    if (existingUser) {
      throw new Error('User already exists with given email or phone number');
    }

    const hashedPassword = this.hashingProvider.hash(password);
    registerUserDto.password = hashedPassword;

    const userId = await this.authRepository.register(registerUserDto);
    return { userId };
  }
}
