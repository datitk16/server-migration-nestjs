import { LoginDto, RegisterDto } from './dto';
import { config } from '@libs/shared/configs';
import { Status } from '@libs/shared/constants';
import { HashTransformer } from '@libs/shared/typeorm/transformers/hash.transformer';
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entity';
import { AuthRepository } from './repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) { }

    async createUser(userData: RegisterDto): Promise<UserEntity> {
        const user = this.authRepository.create(userData);
        return this.authRepository.save(user);
    }

    async login(@Body() user: LoginDto) {
        const email = user.email;

        const credential = await this.authRepository.findOne({ where: { email: email.toLowerCase() } });

        if (!credential || credential.status !== Status.active) {
            throw new UnauthorizedException();
        }

        const valid = await HashTransformer.compare(user.password, credential.password);

        if (!valid) {
            throw new UnauthorizedException();
        }

        const signedData = {
            id: credential.id,
            username: credential.username,
            sourceId: credential.sourceId,
            permission: credential.permission
        };

        const expiresIn = config.auth.expiresIn;
        const accessToken = await this.jwtService.signAsync(signedData, { expiresIn });
        return { accessToken };
    }
}
