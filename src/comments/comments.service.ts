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
import { CommentCreateDto } from './dto/comment.create.dto'
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

    async getAll(post: Posts): Promise<Comments[]> {
        return await this.commentsRepository.getAll(post)
    }

    async countComments(post: Posts) {
        const allComments = await this.getAll(post)
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

    async fixComment({ id, content }) {
        return await this.commentsRepository.fixComment({ id, content })
    }

    async deleteComment({ id, user }) {
        return await this.commentsRepository.deleteComment(id, user)
    }
}
