import { RegisterDto, LoginDto } from './dto';
import { AuthService } from './service';
import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiTags } from '@nestjs/swagger'

@Controller('user')
export class AuthController {
    constructor(
        private readonly userService: AuthService,
        private readonly jwtService: JwtService,
    ) { }

    @Post('signup')
    @ApiTags('Authentication')
    @ApiBody({ type: RegisterDto })
    async signup(@Body() userData: RegisterDto): Promise<{ token: string }> {
        const user = await this.userService.createUser(userData);
        const token = this.jwtService.sign({ sub: user.id, permission: user.permission });
        return { token };
    }

    @Post('login')
    @ApiTags('Authentication')
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto) {
        return this.userService.login(loginDto);
    }
}
