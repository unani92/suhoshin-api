import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import { User } from '../auth/auth.entity'
import { Comments } from "../comments/comments.entity";

@Entity()
export class Posts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'tinyint', default: 0 })
    post_type: number

    @ManyToOne(() => User)
    user: User

    @Column({ default: null })
    title: string

    @Column({ type: 'longtext', default: null })
    content: string

    // 0 임시글 1 작성완료
    @Column({ type: 'tinyint', default: 0 })
    status: number

    // 숨김글 0 일반글 1
    @Column({ type: 'tinyint', default: 1 })
    enabled: number

    @Column({ type: 'tinyint', default: 0 })
    is_main: number

    @Column({ default: 0 })
    hits: number

    @OneToMany(() => Comments, (Comments) => Comments.post)
    comments: Comments[]

    @OneToMany(() => Thumbs, (Thumbs) => Thumbs.post)
    thumbs: Thumbs[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

@Entity()
export class Thumbs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @ManyToOne(() => Posts, (Posts) => Posts.thumbs)
    post: Posts
}
