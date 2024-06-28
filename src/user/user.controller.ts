import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async findAll(@Query('search') search: string) {
    return this.userService.findAll(search);
  }
}
