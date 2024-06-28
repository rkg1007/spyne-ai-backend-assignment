import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED) // Set the status code to 201
  async register(@Body() registerUserDto: any) {
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK) // Set the status code to 200
  async login(@Body() loginUserDto: any) {
    return this.authService.login(loginUserDto);
  }
}
