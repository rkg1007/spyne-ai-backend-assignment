import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggedInUser } from 'src/common/decorators/user.decorator';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async findAll(@Query('search') search: string) {
    return this.userService.findAll(search);
  }

  @Post('/:followeeId/follow')
  async follow(
    @Param('followeeId') followeeId: string,
    @LoggedInUser() user: any,
  ) {
    const followerId = user.id;
    return this.userService.follow(followerId, followeeId);
  }
}
