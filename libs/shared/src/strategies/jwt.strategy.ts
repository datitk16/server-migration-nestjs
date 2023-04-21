import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthTokenIssuer } from '../supports';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authTokenIssuer: AuthTokenIssuer
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors(
                [
                    ExtractJwt.fromAuthHeaderAsBearerToken(),
                    ExtractJwt.fromUrlQueryParameter('accessToken'),
                ],
            ),
            ignoreExpiration: false,
            secretOrKey: 'secretKey',
        });
    }

    validate(payload: any) {
        console.log(payload)
        return this.authTokenIssuer.validate(payload);
    }
}