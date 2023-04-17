import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    email: string;

    @Column({ length: 128 })
    username: string;

    @Column({ name: 'first_name', length: 128 })
    firstName: string;

    @Column({ name: 'last_name', length: 128 })
    lastName: string;

    @Column({ length: 250 })
    avatar: string;

    @Column('varchar')
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column('varchar')
    @Exclude({ toPlainOnly: true })
    salt: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column({ name: 'signature' })
    @Exclude({ toPlainOnly: true })
    signature: string;

    @Exclude({ toPlainOnly: true })
    @Column({
        name: 'token_2fa',
    })
    // @Encrypting()
    token2Fa: string;

    @Exclude({ toPlainOnly: true })
    @Column({ name: 'token_2fa_expiry' })
    token2FaExpiry: Date;

    @Column({ name: 'profile', type: 'json' })
    profile: object;

    @Column({ name: 'activated' })
    activated: Date;

    @Column({ name: 'last_login' })
    lastLogin: Date;

    @Column({ name: 'force_change_password' })
    forceChangePassword: Date;

    @Exclude({ toPlainOnly: true })
    @Column({ name: 'reset_password_token' })
    resetPasswordToken: string;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'updated_at' })
    updatedAt: Date;

}
