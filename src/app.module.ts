import { Module } from '@nestjs/common'
import { NotesModule } from './notes/notes.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { VoteModule } from './vote/vote.module'
import { StatusUpdateModule } from './status-update/status-update.module'
import { GroupsModule } from './groups/groups.module'
import { CommentsModule } from './comments/comments.module'
// entities
import { Note } from './notes/notes.entity'
import { User } from './auth/auth.entity'
import { Vote, VoteUser, VoteContent } from './vote/vote.entity'
import { StatusUpdate } from './status-update/status-update.entity'
import { Groups } from './groups/groups.entity'
import { PostModule } from './post/post.module'
import { Posts, Thumbs } from './post/post.entity'
import { GamesModule } from './games/games.module'
import { Games } from './games/games.entity'
import { Comments, CommentThumbs, Replies, ReplyThumbs } from './comments/comments.entity'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.NEST_MYSQL_HOST,
            port: 3306,
            username: process.env.NEST_MYSQL_USERNAME,
            password: process.env.NEST_MYSQL_PASSWORD,
            database: process.env.NEST_MYSQL_DATABASE,
            entities: [
                Note,
                User,
                Vote,
                VoteUser,
                VoteContent,
                StatusUpdate,
                Groups,
                Posts,
                Thumbs,
                Games,
                Comments,
                Replies,
                CommentThumbs,
                ReplyThumbs,
            ],
            synchronize: true,
            cache: {
                duration: 30000, // 30 seconds
            },
        }),
        NotesModule,
        AuthModule,
        VoteModule,
        StatusUpdateModule,
        GroupsModule,
        PostModule,
        GamesModule,
        CommentsModule,
    ],
})
export class AppModule {}
