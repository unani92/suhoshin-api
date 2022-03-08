import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { FormDataRequest } from 'nestjs-form-data'
import { GetUser } from '../decorators'
import { User } from '../auth/auth.entity'
import { AuthGuard } from '@nestjs/passport'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    @UseGuards(AuthGuard())
    getPosts(@Query() query) {
        const { page, post_type } = query
        return this.postService.getPosts(Number(page), Number(post_type))
    }

    @Post('upload-image')
    @FormDataRequest()
    @UseGuards(AuthGuard())
    uploadImage(@Body() body) {
        const { post_id, img_num, image } = body
        return this.postService.uploadImage({ post_id, img_num, image })
    }

    @Post('temp-upload')
    @UseGuards(AuthGuard())
    createPost(@GetUser() user: User) {
        const { id: userId } = user
        return this.postService.createPost(userId)
    }

    @Put('upload')
    @UseGuards(AuthGuard())
    updatePost(@Body() body) {
        const { id, post_type, title, content } = body
        return this.postService.updatePost({
            id,
            post_type,
            title,
            content,
        })
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard())
    deletePost(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
        // 본인 외에 삭제 금지 로직 추가 예정
        return this.postService.deletePost(id, user)
    }
}
