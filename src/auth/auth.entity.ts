import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    uuid: number

    @Column()
    email: string

    @Column()
    nickname: string

    // 0 미인증 1 인증 2 운영진
    @Column({ default: 0 })
    user_status: number

    // 0 탈퇴, 정지 등 1 이용가능
    @Column({ default: 1 })
    enabled: number
}
