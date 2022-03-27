import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from '../post/post.entity'
import { User } from '../auth/auth.entity'

@Entity()
export class Comments extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    content: string

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

    @ManyToOne(() => Comments)
    comment: Comments

    @ManyToOne(() => User)
    user: User
}
