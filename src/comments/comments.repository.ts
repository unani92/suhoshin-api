import { EntityRepository, Repository } from 'typeorm'
import { Comments, CommentThumbs, Replies, ReplyThumbs } from './comments.entity'
import { ResInterface } from '../res.interface'
import { Posts } from '../post/post.entity'
import { CommentCreateDto } from './dto/comment.create.dto'
import { UnauthorizedException } from '@nestjs/common'

@EntityRepository(Comments)
export class CommentsRepository extends Repository<Comments> {
    async getAll(post: Posts): Promise<Comments[]> {
        return await this.find({
            relations: ['user', 'replies'],
            order: { id: 'DESC' },
            where: { post },
        })
    }

    async createComment({ content, secret, post, user }: CommentCreateDto): Promise<ResInterface> {
        const comment = await this.create({ user, post, secret, content })
        this.save(comment)

        return {
            status: 200,
            msg: '댓글이 작성되었어요',
        }
    }

    async fixComment({ id, content }): Promise<ResInterface> {
        const comment = await this.findOneOrFail({ id })
        comment.content = content
        this.save(comment)

        return {
            status: 200,
            msg: '댓글이 수정되었어요',
        }
    }

    async deleteComment({ id, user }): Promise<ResInterface> {
        const comment = await this.findOneOrFail({ id })
        if (comment.user !== user) throw new UnauthorizedException()

        this.delete(comment)

        return {
            status: 200,
            msg: '댓글이 삭제되었어요',
        }
    }
}

@EntityRepository(Replies)
export class RepliesRepository extends Repository<Replies> {}

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
