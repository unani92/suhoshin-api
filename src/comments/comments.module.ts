import { Module } from '@nestjs/common'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from '../auth/auth.repository'
import { AuthModule } from '../auth/auth.module'
import {
    CommentsRepository,
    RepliesRepository,
    CommentThumbsRepository,
    ReplyThumbsRepository,
} from './comments.repository'
import { PostsRepository } from '../post/post.repository'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentsRepository,
            CommentThumbsRepository,
            RepliesRepository,
            ReplyThumbsRepository,
            UserRepository,
            PostsRepository,
        ]),
        AuthModule,
    ],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}
