import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED) // Set the status code to 201
  @Public() // Set the route to public
  async register(@Body() registerUserDto: any) {
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK) // Set the status code to 200
  @Public() // Set the route to public
  async login(@Body() loginUserDto: any) {
    return this.authService.login(loginUserDto);
  }
}
