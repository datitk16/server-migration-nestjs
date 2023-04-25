import { AuthService } from './user/service';
import { AuthController } from './user/controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './user/repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'auth/src/strategies/jwt.strategy';
import { AuthTokenIssuer } from './supports';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey', // replace with your own secret key
      signOptions: { expiresIn: '1h' }, // token expires in 1 hour
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthTokenIssuer,
    JwtStrategy,
    AuthRepository,
    AuthService
  ]
})
export class AuthModule { }
