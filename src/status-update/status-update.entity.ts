import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Groups } from '../groups/groups.entity'

@Entity()
export class StatusUpdate extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @ManyToOne(() => Groups)
    group: Groups

    @Column()
    content: string

    @Column({ default: 0 })
    confirmed: number

    @Column({ default: null })
    declined_reason: string

    @Column({ default: null })
    thumbnail: string

    @CreateDateColumn()
    created_at: Date
}
