import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Posts } from '../post/post.entity'
import { User } from '../auth/auth.entity'

@Entity()
export class Comments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    content: string

    @Column({ default: 0, type: 'tinyint' })
    secret: number

    @OneToMany(() => Replies, (Replies) => Replies.comment)
    replies: Replies[]

    @ManyToOne(() => Posts, (Posts) => Posts.thumbs)
    post: Posts

    @ManyToOne(() => User)
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

@Entity()
export class Replies extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    content: string

    @Column({ default: 0, type: 'tinyint' })
    secret: number

    @ManyToOne(() => Comments)
    comment: Comments

    @ManyToOne(() => User)
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

@Entity()
export class CommentThumbs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @ManyToOne(() => Comments)
    comment: Comments

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

@Entity()
export class ReplyThumbs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @ManyToOne(() => Replies)
    reply: Replies

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
