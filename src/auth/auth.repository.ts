import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  constructor() {}

  async register(registerUserDto: any) {
    // Logic to register a user
    console.log(registerUserDto);
    return 'User registered';
  }
}
