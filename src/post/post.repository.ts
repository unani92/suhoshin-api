import { EntityRepository, Between, Repository, Not, IsNull } from 'typeorm'
import { Posts, Thumbs } from './post.entity'
import { User } from '../auth/auth.entity'
import { ResInterface } from '../res.interface'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import * as _ from 'lodash'
import { subDays } from 'date-fns'

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
    async getPosts(page: number, post_type: number, len: number): Promise<any> {
        return await this.find({
            relations: ['user', 'thumbs', 'comments', 'comments.replies'],
            where: { post_type, enabled: 1 },
            order: { id: 'DESC' },
            skip: len * page,
            take: len,
        })
    }

    async getMain() {
        const afterDate = (date: Date) => Between(subDays(date, 2), date)

        const notiMain = await this.find({
            relations: ['user', 'thumbs'],
            where: { post_type: 1, is_main: 1, enabled: 1 },
            order: { id: 'DESC' },
        })
        let hotPosts = await this.find({
            relations: ['user', 'thumbs'],
            // where: { created_at: afterDate(new Date()) },
            where: [
                { post_type: 2, is_main: 1, enabled: 1 },
                { post_type: 4, is_main: 1, enabled: 1 },
            ],
            order: { id: 'DESC' },
            take: 7,
        })
        hotPosts = _.orderBy(hotPosts, (item) => item.thumbs.length, 'desc')

        const notiRes = notiMain.map((item) => ({
            ...item,
            thumbs: item.thumbs.length,
        }))
        const hotRes = hotPosts.map((item) => ({
            ...item,
            thumbs: item.thumbs.length,
        }))
        return {
            noti: notiRes,
            hot: hotRes,
        }
    }

    async getPostById(id: number): Promise<Posts> {
        return await this.findOne({ id })
    }

    async getPostsByUser(page: number, len: number, post_type: number, user: User) {
        return await this.find({
            relations: ['user', 'thumbs', 'comments', 'comments.replies'],
            where: {
                user,
                enabled: 1,
                title: Not(IsNull()),
                content: Not(IsNull()),
                post_type: post_type === -1 ? Not(IsNull()) : post_type,
            },
            order: { id: 'DESC' },
            skip: len * page,
            take: len,
        })
    }

    async createPost(user: User): Promise<Posts> {
        const post = await this.create({ user })
        await this.save(post)

        return post
    }

    async updatePost({ id, post_type, title, content, is_main, block_comment }): Promise<ResInterface> {
        const post = await this.getPostById(id)
        post.title = title
        post.content = content
        post.post_type = post_type
        post.is_main = is_main
        post.block_comment = block_comment

        this.save(post)

        return {
            status: 200,
            msg: '게시글이 생성되었어요',
        }
    }

    async deletePost(id: number, user: User): Promise<ResInterface> {
        let res
        const post = await this.findOne({ id }, { relations: ['user'] })
        if (user.user_status === 2 || post.user.id === user.id) {
            res = await this.delete(id)
        }
        if (res.affected === 0 || !res) throw new NotFoundException('not found')
        return { msg: 'ok', status: 200 }
    }

    async toggleEnabled(id: number, user: User): Promise<ResInterface> {
        const post = await this.findOne({ id }, { relations: ['user'] })
        if (!post) throw new NotFoundException('not found')
        if (user.user_status === 2 || post.user.id === user.id) {
            post.enabled = 0
            await this.save(post)
            return { msg: '게시글이 삭제되었어요', status: 200 }
        } else {
            throw new UnauthorizedException()
        }
    }

    async updateHit(id: number) {
        const post = await this.findOne({ id })
        post.hits += 1
        this.save(post)
    }
}

@EntityRepository(Thumbs)
export class ThumbsRepository extends Repository<Thumbs> {
    async getThumbInfo(user_id, post) {
        return this.findOne({ user_id, post })
    }

    async updateThumbs({ user_id, post }): Promise<ResInterface> {
        const thumb = await this.findOne({ user_id, post })
        if (!thumb) {
            const thumb = await this.create({ user_id, post })
            this.save(thumb)

            return { msg: true, status: 200 }
        } else {
            this.delete({ user_id, post })

            return { msg: false, status: 200 }
        }
    }
}
