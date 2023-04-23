import { config } from '@libs/shared/configs';
import { Status } from '@libs/shared/constants';
import { HashTransformer } from '@libs/shared/typeorm/transformers/hash.transformer';
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities/user.entity';
import { AuthRepository } from '../repositories/repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService
    ) { }

    async createUser(userData: UserEntity): Promise<UserEntity> {
        const user = this.authRepository.create(userData);
        return this.authRepository.save(user);
    }

    async login(@Body() credentialEntity: UserEntity) {
        const username = credentialEntity.username || credentialEntity.email;

        const credential = await this.authRepository.findOne({ where: { username: username.toLowerCase() } });

        if (!credential || credential.status !== Status.active) {
            throw new UnauthorizedException();
        }

        const valid = await HashTransformer.compare(credentialEntity.password, credential.password);

        if (!valid) {
            throw new UnauthorizedException();
        }

        const signedData = {
            id: credential.id,
            username: credential.username,
            sourceId: credential.sourceId,
        };

        const expiresIn = config.auth.expiresIn;
        const accessToken = await this.jwtService.signAsync(signedData, { expiresIn });
        return { accessToken };
    }
}
