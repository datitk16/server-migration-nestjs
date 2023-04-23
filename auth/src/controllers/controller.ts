import { AuthService } from '../services/service';
import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities/user.entity';

@Controller('user')
export class AuthController {
    constructor(
        private readonly userService: AuthService,
        private readonly jwtService: JwtService,
    ) { }

    @Post('signup')
    async signup(@Body() userData: UserEntity): Promise<{ token: string }> {
        const user = await this.userService.createUser(userData);
        const token = this.jwtService.sign({ sub: user.id, permission: user.permission });
        return { token };
    }


    @Post('login')
    async login(@Body() userData: UserEntity) {
        return this.userService.login(userData);
    }
}
