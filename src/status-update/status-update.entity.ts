import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Groups } from '../groups/groups.entity'
import { User } from '../auth/auth.entity'

@Entity()
export class StatusUpdate extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Groups)
    group: Groups

    @Column({ type: 'longtext', default: null })
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
