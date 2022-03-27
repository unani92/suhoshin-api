import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}

@Entity()
export class CommentThumbs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @ManyToOne(() => Comments)
    comment: Comments
}

@Entity()
export class ReplyThumbs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @ManyToOne(() => Replies)
    reply: Replies
}
