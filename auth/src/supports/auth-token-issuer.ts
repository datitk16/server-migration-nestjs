import { BaseTokenIssuer, JWTPayload } from '@libs/shared/services/base-token-issuer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthTokenIssuer extends BaseTokenIssuer {
    async validate(payload: JWTPayload) {
        // this.authorize(payload);
        // if (await this.isRevoked(payload)) {
        //     throw new CoreUnauthorizedException(AUTH016);
        // }
        // const activeToken = await this.getActiveToken(payload);
        // // to make sure only one accessToken available
        // if (activeToken && activeToken !== payload.uuid) {
        //     throw new CoreUnauthorizedException(AUTH016);
        // }
        // const user = payload.userId && (await UserEntity.findOne(payload.userId));
        // if (user?.status === UserStatus.deactivated) {
        //     throw new CoreForbiddenException(AUTH002);
        // }
        return payload;
    }

}
