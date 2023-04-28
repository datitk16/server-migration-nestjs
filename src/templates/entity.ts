import { BaseEntity } from "@libs/shared/typeorm/entities";
import { Column, Entity } from "typeorm";

@Entity('fin_template')
export class TemplateEntity extends BaseEntity {
    @Column({
        type: 'nvarchar',
        length: 'MAX',
    })
    html?: string;

    @Column({
        nullable: true,
    })
    css?: string;

    @Column({
        nullable: true,
    })
    name?: string;

    // Add this column to support  migration ( update html, name ... )
    @Column({ nullable: true })
    code?: string;

    // TODO: Add more fields  if extends from redoc later;
}
