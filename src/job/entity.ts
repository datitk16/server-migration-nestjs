import { Column, Entity } from '@libs/shared/typeorm';
import { BaseEntity } from '@libs/shared/typeorm/entities';

@Entity('job')
export class Job extends BaseEntity {
    @Column()
    jobTitle: string;

    @Column()
    minSalary: string;

    @Column()
    maxSalary: string;
}
