import { CredentialService } from './service';
import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialEntity } from './entity';

@Controller('auth')
export class CredentialController {
    constructor(
        private readonly userService: CredentialService,
        private readonly jwtService: JwtService,
    ) { }

    @Post('signup')
    async signup(@Body() userData: CredentialEntity): Promise<{ token: string }> {
        const user = await this.userService.createUser(userData);
        const token = this.jwtService.sign({ sub: user.id });
        return { token };
    }
}
