import { EntityRepository, Repository } from 'typeorm'
import { Comments, CommentThumbs, Replies, ReplyThumbs } from './comments.entity'
import { ResInterface } from '../res.interface'
import { Posts } from '../post/post.entity'
import { User } from '../auth/auth.entity'
import { CommentCreateDto } from './dto/comment.create.dto'
import { UnauthorizedException } from '@nestjs/common'
import { ReplyCreateDto } from './dto/reply.create.dto'

@EntityRepository(Comments)
export class CommentsRepository extends Repository<Comments> {
    async getAll(post: Posts) {
        const comments = await this.find({
            relations: ['user', 'replies'],
            order: { id: 'DESC' },
            where: { post },
        })

        return comments.map((comment: Comments) => ({
            ...comment,
            user: {
                id: comment.user.id,
                nickname: comment.user.nickname,
                enabled: comment.user.enabled,
                user_status: comment.user.user_status,
            },
        }))
    }

    async createComment({ content, secret, post, user }: CommentCreateDto): Promise<ResInterface> {
        const comment = await this.create({ user, post, secret, content })
        this.save(comment)

        return {
            status: 200,
            msg: '댓글이 작성되었어요',
        }
    }

    async fixComment({ id, content, user }): Promise<ResInterface> {
        const comment = await this.findOneOrFail({
            relations: ['user'],
            where: { id },
        })
        if (comment.user.id !== user.id) throw new UnauthorizedException()
        comment.content = content

        await this.save(comment)
        return {
            status: 200,
            msg: '댓글이 수정되었어요',
        }
    }

    async deleteComment(id, user: User): Promise<ResInterface> {
        const comment = await this.findOneOrFail({
            relations: ['user'],
            where: { id },
        })
        if (comment.user !== user && user.user_status !== 2) throw new UnauthorizedException()

        await this.delete({ id })
        return {
            status: 200,
            msg: '댓글이 삭제되었어요',
        }
    }
}

@EntityRepository(Replies)
export class RepliesRepository extends Repository<Replies> {
    async createReply({ content, secret, comment, user }: ReplyCreateDto): Promise<ResInterface> {
        const reply = this.create({ content, secret, comment, user })

        this.save(reply)

        return {
            status: 200,
            msg: '댓글이 작성되었어요',
        }
    }

    async fixReply({ id, content }): Promise<ResInterface> {
        const reply = await this.findOneOrFail({ id })
        reply.content = content
        this.save(reply)

        return {
            status: 200,
            msg: '댓글이 수정되었어요',
        }
    }

    async deleteReply(id, user: User): Promise<ResInterface> {
        const reply = await this.findOneOrFail({ id })
        if (reply.user !== user && user.user_status !== 2) throw new UnauthorizedException()

        this.delete(reply)

        return {
            status: 200,
            msg: '댓글이 삭제되었어요',
        }
    }
}

@EntityRepository(CommentThumbs)
export class CommentThumbsRepository extends Repository<CommentThumbs> {
    async getThumbInfo(user_id, comment) {
        return this.findOne({ user_id, comment })
    }

    async updateCommentThumbs({ user_id, comment }): Promise<ResInterface> {
        const commentThumb = await this.findOne({ user_id, comment })
        if (!commentThumb) {
            const commentThumb = await this.create({ user_id, comment })
            this.save(commentThumb)

            return { msg: true, status: 200 }
        } else {
            this.delete({ user_id, comment })

            return { msg: false, status: 200 }
        }
    }
}

@EntityRepository(ReplyThumbs)
export class ReplyThumbsRepository extends Repository<ReplyThumbs> {
    async getThumbInfo(user_id, reply) {
        return this.findOne({ user_id, reply })
    }

    async updateReplyThumbs({ user_id, reply }): Promise<ResInterface> {
        const replyThumb = await this.findOne({ user_id, reply })
        if (!replyThumb) {
            const replyThumb = await this.create({ user_id, reply })
            this.save(replyThumb)

            return { msg: true, status: 200 }
        } else {
            this.delete({ user_id, reply })

            return { msg: false, status: 200 }
        }
    }
}
