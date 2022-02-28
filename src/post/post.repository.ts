import { EntityRepository, Repository } from 'typeorm'
import { Posts } from './post.entity'
import { User } from '../auth/auth.entity'
import { ResInterface } from '../res.interface'
import { NotFoundException } from '@nestjs/common'

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
    async getAllPosts(page: number): Promise<Posts[]> {
        return await this.find({
            relations: ['user'],
            order: { id: 'DESC' },
            skip: 10 * page,
            take: 10,
        })
    }

    async getPostById(id: number): Promise<Posts> {
        return await this.findOne({ id })
    }

    async createPost(user: User): Promise<Posts> {
        const post = await this.create({ user })
        this.save(post)

        return post
    }

    async updatePost({ id, post_type, title, content }): Promise<ResInterface> {
        const post = await this.getPostById(id)
        post.title = title
        post.content = content
        post.post_type = post_type

        this.save(post)

        return {
            status: 200,
            msg: '게시글이 생성되었어요',
        }
    }

    async deletePost(id: number, user: User): Promise<ResInterface> {
        let res
        const post = await this.findOne({ id })
        if (user.user_status === 2 || post.user.id === user.id) {
            res = await this.delete(id)
        }
        if (res.affected === 0 || !res) throw new NotFoundException('not found')
        return { msg: 'ok', status: 200 }
    }
}
