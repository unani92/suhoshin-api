import { Module } from '@nestjs/common'
import { NotesModule } from './notes/notes.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { VoteModule } from './vote/vote.module'
import { StatusUpdateModule } from './status-update/status-update.module'
// entities
import { Note } from './notes/notes.entity'
import { User } from './auth/auth.entity'
import { Vote, VoteUser, VoteContent } from './vote/vote.entity'
import { StatusUpdate } from './status-update/status-update.entity'

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
            entities: [Note, User, Vote, VoteUser, VoteContent, StatusUpdate],
            synchronize: true,
            cache: {
                duration: 30000, // 30 seconds
            },
        }),
        NotesModule,
        AuthModule,
        VoteModule,
        StatusUpdateModule,
    ],
})
export class AppModule {}
