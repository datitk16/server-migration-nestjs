import { ForbiddenException, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import Str from '../supports/str';

export interface JWTPayload {
    issuerName?: string;
    uuid?: string;

    [key: string]: any;
}

export interface ITokenValidation {
    validate(payload: JWTPayload): any;
}

export { SignOptions } from 'jsonwebtoken';

@Injectable()
export class BaseTokenIssuer implements OnModuleInit {
    static blackList: string[] = [];
    static tokens: any[] = [];
    private static container: any[] = [];
    protected issuerName: string = this.constructor.name;
    static runTimeJwt: JwtService;

    constructor(
        readonly jwtService: JwtService,
    ) {
        BaseTokenIssuer.runTimeJwt = this.jwtService;
    }

    static get<T extends BaseTokenIssuer>(tokenOrClass: string | T): T {
        const token = typeof tokenOrClass === 'string' ? tokenOrClass : tokenOrClass.issuerName;
        return BaseTokenIssuer.container[token];
    }

    static getIssuer<T extends BaseTokenIssuer>(tokenOrClass: string | T): T {
        return BaseTokenIssuer.get(tokenOrClass);
    }

    static getIssuerFromJwt(jwt: string) {
        const payload = BaseTokenIssuer.runTimeJwt.decode(jwt);
        return payload['issuerName'] && BaseTokenIssuer.getIssuer(payload['issuerName']);
    }

    issue(payload: JWTPayload, options?: JwtSignOptions) {
        const token = this.jwtService.sign(
            {
                issuerName: this.issuerName ?? this.constructor.name,
                uuid: Str.uuid(),
                ...payload,
            },
            options,
        );
        BaseTokenIssuer.tokens[payload.uuid] = payload;
        return token;
    }

    validate(payload: JWTPayload): any {
        return false;
    }

    authorize(payload: JWTPayload) {
        if (payload.issuerName !== this.issuerName) {
            throw new ForbiddenException('Invalid token');
        }
    }

    onModuleInit(): any {
        BaseTokenIssuer.container[this.issuerName] = this;
    }
}
