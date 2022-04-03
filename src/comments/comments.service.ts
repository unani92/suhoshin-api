import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    CommentsRepository,
    CommentThumbsRepository,
    RepliesRepository,
    ReplyThumbsRepository,
} from './comments.repository'
import { Posts } from '../post/post.entity'
import { Comments } from './comments.entity'
import { PostsRepository } from '../post/post.repository'

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsRepository)
        @InjectRepository(RepliesRepository)
        @InjectRepository(CommentThumbsRepository)
        @InjectRepository(ReplyThumbsRepository)
        @InjectRepository(PostsRepository)
        private commentsRepository: CommentsRepository,
        private repliesRepository: RepliesRepository,
        private commentThumbsRepository: CommentThumbsRepository,
        private replyThumbsRepository: ReplyThumbsRepository,
        private postsRepository: PostsRepository,
    ) {}

    async getAll(user, post_id: number) {
        const post = await this.postsRepository.findOneOrFail({
            relations: ['user'],
            where: { id: post_id },
        })
        const comments = await this.commentsRepository.getAll(user, post)

        let count = comments.length
        comments.forEach((comment: Comments) => {
            count += comment.replies.length
        })

        return { count, comments }
    }

    async countComments(user, post: Posts) {
        const allComments = await this.commentsRepository.getAll(user, post)
        let cnt = allComments.length
        allComments.forEach((comment: Comments) => {
            cnt += comment.replies.length
        })

        return cnt
    }

    async createComment({ content, secret, post_id, user }) {
        const post = await this.postsRepository.getPostById(post_id)
        return await this.commentsRepository.createComment({ content, secret, post, user })
    }

    async fixComment({ id, content, user }) {
        return await this.commentsRepository.fixComment({ id, content, user })
    }

    async deleteComment({ id, user }) {
        return await this.commentsRepository.deleteComment(id, user)
    }

    async createReply({ content, secret, comment_id, user }) {
        const comment = await this.commentsRepository.findOneOrFail({ id: comment_id })
        return await this.repliesRepository.createReply({ content, secret, comment, user })
    }

    async fixReply({ id, content, user }) {
        return this.repliesRepository.fixReply({ id, content, user })
    }

    async deleteReply(id, user) {
        return await this.repliesRepository.deleteReply(id, user)
    }
}
