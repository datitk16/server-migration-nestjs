import { AuthService } from './services/service';
import { AuthController } from './controllers/controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './repositories/repository';
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
