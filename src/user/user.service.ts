import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(search: string = '') {
    return this.userRepository.findAll(search);
  }

  async follow(followerId: string, followeeId: string) {
    const followingId = await this.userRepository.follow(
      followerId,
      followeeId,
    );
    return { followingId };
  }
}
