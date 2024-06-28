import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { HashingProvider } from 'src/common/providers/hashing.provider';
import { isEmail } from 'src/common/utils';
import { JwtProvider } from 'src/common/providers/jwt.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async register(registerUserDto: any) {
    const { email, phone, password } = registerUserDto;

    const existingUser = await this.authRepository.getUser(email, phone);
    if (existingUser) {
      throw new BadRequestException(
        'User already exists with given email or phone number',
      );
    }

    const hashedPassword = await this.hashingProvider.hash(password);
    registerUserDto.password = hashedPassword;

    const userId = await this.authRepository.register(registerUserDto);
    return { userId };
  }

  async login(loginUserDto: any) {
    const { emailOrPhone, password } = loginUserDto;

    let email = null;
    let phone = emailOrPhone;
    if (isEmail(emailOrPhone)) {
      email = emailOrPhone;
      phone = null;
    }

    const user = await this.authRepository.getUser(email, phone);
    if (!user) {
      throw new NotFoundException(
        'User not found with given email or phone number',
      );
    }

    const isPasswordValid = await this.hashingProvider.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const jwtPayload = {
      userId: user.id,
      email: user.email,
      phone: user.phone,
    };
    const jwtToken = await this.jwtProvider.sign(jwtPayload);
    return { token: jwtToken };
  }
}
