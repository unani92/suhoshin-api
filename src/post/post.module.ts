import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { FileUploadService } from '../FileUploadS3'
import { NestjsFormDataModule } from 'nestjs-form-data'
import { AuthModule } from '../auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsRepository, ThumbsRepository } from './post.repository'
import { UserRepository } from '../auth/auth.repository'

@Module({
    imports: [
        TypeOrmModule.forFeature([PostsRepository, UserRepository, ThumbsRepository]),
        NestjsFormDataModule,
        AuthModule,
    ],
    controllers: [PostController],
    providers: [PostService, FileUploadService],
})
export class PostModule {}
