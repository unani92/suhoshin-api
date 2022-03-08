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
        private postsRepository: PostsRepository,
        private userRepository: UserRepository,
        private fileUploadService: FileUploadService,
    ) {}

    async getPosts(page: number, post_type: number) {
        const res = await this.postsRepository.getPosts(page, post_type)

        return res.map((item) => ({
            ...item,
            thumbs: item.thumbs.length,
        }))
    }

    async uploadImage({ post_id, img_num, image }): Promise<any> {
        const imgUrl = await this.fileUploadService.upload(image, `posts/${post_id}`, `${post_id}_${img_num}.jpg`)

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

    async deletePost(id, user): Promise<ResInterface> {
        return await this.postsRepository.deletePost(id, user)
    }
}
