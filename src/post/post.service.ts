import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostsRepository, ThumbsRepository } from './post.repository'
import { UserRepository } from '../auth/auth.repository'
import { FileUploadService } from '../FileUploadS3'
import { ResInterface } from '../res.interface'
import { Posts } from './post.entity'
import { User } from '../auth/auth.entity'

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostsRepository)
        @InjectRepository(UserRepository)
        @InjectRepository(ThumbsRepository)
        private postsRepository: PostsRepository,
        private userRepository: UserRepository,
        private fileUploadService: FileUploadService,
        private thumbsRepository: ThumbsRepository,
    ) {}

    async getPosts(page: number, post_type: number, user_status: number | undefined, len: number) {
        if (post_type === 4 && ![1, 2].includes(user_status)) return []

        const res = await this.postsRepository.getPosts(page, post_type, len)
        return res.map((item) => ({
            ...item,
            user: {
                id: item.user.id,
                nickname: item.user.nickname,
                thumbnail: item.user.thumbnail,
                enabled: item.user.enabled,
            },
            comments: item.comments.reduce((acc, curr) => {
                return acc + curr.replies.length + 1
            }, 0),
            thumbs: item.thumbs.length,
        }))
    }

    async getMain() {
        return await this.postsRepository.getMain()
    }

    async getPostById(post_id) {
        return await this.postsRepository.getPostById(post_id)
    }

    async getPostsByUser(page: number, len: number, post_type: number, user: User) {
        const res = await this.postsRepository.getPostsByUser(page, len, post_type, user)
        return res.map((item) => ({
            ...item,
            user: {
                id: item.user.id,
                nickname: item.user.nickname,
                thumbnail: item.user.thumbnail,
                enabled: item.user.enabled,
            },
            comments: item.comments.reduce((acc, curr) => {
                return acc + curr.replies.length + 1
            }, 0),
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

    async updatePost({ id, post_type, title, content, is_main, block_comment }): Promise<ResInterface> {
        return await this.postsRepository.updatePost({
            id,
            post_type,
            content,
            title,
            is_main,
            block_comment,
        })
    }

    async deletePost(id, user): Promise<ResInterface> {
        return await this.postsRepository.deletePost(id, user)
    }

    async toggleEnabled(id, user): Promise<ResInterface> {
        return await this.postsRepository.toggleEnabled(id, user)
    }

    async updateThumbs({ user_id, post_id }) {
        const post = await this.postsRepository.findOne({ id: post_id })

        return this.thumbsRepository.updateThumbs({ user_id, post })
    }

    async getThumbInfo(user_id, post_id): Promise<ResInterface> {
        const post = await this.postsRepository.getPostById(post_id)
        const res = await this.thumbsRepository.getThumbInfo(user_id, post)
        return { status: 200, msg: !!res }
    }

    async updateHit(id) {
        await this.postsRepository.updateHit(id)
    }
}
