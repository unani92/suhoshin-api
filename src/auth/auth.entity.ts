import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    nickname: string

    @Column()
    password: string

    @Column()
    phone_number: string

    @Column({ default: 0 })
    user_status: number
}