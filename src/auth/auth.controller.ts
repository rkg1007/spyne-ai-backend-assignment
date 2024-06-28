import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerUserDto: any) {
    return this.authService.register(registerUserDto);
  }
}
