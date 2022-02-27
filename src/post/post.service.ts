import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostsRepository } from './post.repository'
import { UserRepository } from '../auth/auth.repository'
import { FileUploadService } from '../FileUploadS3'
import { ResInterface } from '../res.interface'
import { Posts } from './post.entity'

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostsRepository)
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private postsRepository: PostsRepository,
        private fileUploadService: FileUploadService,
    ) {}

    async uploadImage({ userId, img_num, image }): Promise<any> {
        const imgUrl = await this.fileUploadService.upload(image, `posts/${userId}`, `${userId}_${img_num}.jpg`)

        return { status: 200, msg: '이미지가 업로드되었어요', imgUrl }
    }

    async createPost(userId): Promise<Posts> {
        const user = await this.userRepository.searchById(userId)

        return await this.postsRepository.createPost(user)
    }

    async updatePost({ id, post_type, title, content }): Promise<ResInterface> {
        return await this.postsRepository.updatePost({
            id,
            post_type,
            content,
            title,
        })
    }

    async deletePost(id): Promise<ResInterface> {
        return await this.postsRepository.deletePost(id)
    }
}
