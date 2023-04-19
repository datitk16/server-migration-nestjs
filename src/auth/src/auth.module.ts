import { CredentialService } from './credentials/service';
import { CredentialController } from './credentials/controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CredentialRepository } from './credentials/repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey', // replace with your own secret key
      signOptions: { expiresIn: '1h' }, // token expires in 1 hour
    }),
  ],
  controllers: [CredentialController],
  providers: [
    CredentialRepository,
    CredentialService
  ]
})
export class AuthModule { }
