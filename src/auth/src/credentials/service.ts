import { Injectable } from '@nestjs/common';
import { CredentialEntity } from './entity';
import { CredentialRepository } from './repository';

@Injectable()
export class CredentialService {
    constructor(
        private readonly userRepository: CredentialRepository,
    ) { }

    async createUser(userData: CredentialEntity): Promise<CredentialEntity> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
}
