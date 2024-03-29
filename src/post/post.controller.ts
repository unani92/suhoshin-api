import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common'
import { FormDataRequest } from 'nestjs-form-data'
import { GetUser } from '../decorators'
import { User } from '../auth/auth.entity'
import { AuthGuard } from '@nestjs/passport'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    getPosts(@Query() query, @GetUser() user: User) {
        const { page, post_type, len } = query
        const user_status = user ? user.user_status : 0
        return this.postService.getPosts(Number(page), Number(post_type), user_status, Number(len))
    }

    @Get('me')
    @UseGuards(AuthGuard())
    getMyPosts(@Query() query, @GetUser() user: User) {
        const { page, len, post_type } = query
        return this.postService.getPostsByUser(Number(page), Number(len), Number(post_type), user)
    }

    @Get('hot')
    getMain() {
        return this.postService.getMain()
    }

    @Get('get-info')
    @UseGuards(AuthGuard())
    getPostById(@Query('post_id', ParseIntPipe) post_id) {
        return this.postService.getPostById(post_id)
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

    @Put('update_hit/:id')
    updateHit(@Param('id', ParseIntPipe) id) {
        return this.postService.updateHit(id)
    }

    @Put('upload')
    @UseGuards(AuthGuard())
    updatePost(@Body() body) {
        const { id, post_type, title, content, is_main, block_comment } = body
        return this.postService.updatePost({
            id,
            post_type,
            title,
            content,
            is_main,
            block_comment,
        })
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard())
    deletePost(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
        // 본인 외에 삭제 금지 로직 추가 예정
        return this.postService.deletePost(id, user)
    }

    @Put('delete/:id')
    @UseGuards(AuthGuard())
    toggleEnabled(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
        return this.postService.toggleEnabled(id, user)
    }

    @Post('thumb/:id')
    @UseGuards(AuthGuard())
    updateThumbs(@GetUser() user: User, @Param('id', ParseIntPipe) post_id: number) {
        const { id: user_id } = user
        return this.postService.updateThumbs({ user_id, post_id })
    }

    @Get('thumb')
    @UseGuards(AuthGuard())
    getThumbInfo(@GetUser() user: User, @Query('post_id', ParseIntPipe) post_id: number) {
        const { id: user_id } = user
        return this.postService.getThumbInfo(user_id, post_id)
    }
}
