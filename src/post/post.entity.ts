import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn,
} from 'typeorm'
import { User } from '../auth/auth.entity'

@Entity()
export class Posts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 1 })
    post_type: number

    @ManyToOne(() => User)
    user: User

    @Column({ default: null })
    title: string

    @Column({ default: null })
    content: string

    // 0 임시글 1 작성완료
    @Column({ default: 0 })
    status: number

    // 숨김글 0 일반글 1
    @Column({ default: 1 })
    enabled: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
