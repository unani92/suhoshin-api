import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class StatusUpdate extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    content: string

    @Column({ default: 0 })
    confirmed: number

    @Column()
    declined_reason: string

    @Column()
    thumbnail: string | null

    @CreateDateColumn()
    created_at: Date
}
