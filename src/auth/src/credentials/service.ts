import { config } from '@libs/shared/configs';
import { Status } from '@libs/shared/constants';
import { HashTransformer } from '@libs/shared/typeorm/transformers/hash.transformer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialEntity } from './entity';
import { CredentialRepository } from './repository';

@Injectable()
export class CredentialService {
    constructor(
        private readonly userRepository: CredentialRepository,
        private readonly jwtService: JwtService
    ) { }

    async createUser(userData: CredentialEntity): Promise<CredentialEntity> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async login(credentialEntity: CredentialEntity) {
        const username = credentialEntity.username || credentialEntity.email;

        const credential = await this.userRepository.findOne({ where: { username: username.toLowerCase() } });

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
