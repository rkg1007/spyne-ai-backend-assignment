import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtProvider } from './providers/jwt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { createPool } from 'mysql2';
import { DatabaseProvider } from './providers/database.provider';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtProvider,
    HashingProvider,
    {
      provide: 'DATABASE_POOL',
      useFactory: async (configService: ConfigService) => {
        const pool = createPool({
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
        });
        return pool;
      },
      inject: [ConfigService],
    },
    DatabaseProvider,
  ],
  exports: [JwtProvider, HashingProvider, DatabaseProvider],
})
export class CommonModule {}
