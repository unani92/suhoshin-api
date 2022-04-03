import { Controller, Get, ParseIntPipe, UseGuards, Param, Query, Post, Body, Put, Delete } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../decorators'
import { User } from '../auth/auth.entity'

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    @UseGuards(AuthGuard())
    getAllComments(@Query('post_id', ParseIntPipe) post_id: number) {
        return this.commentsService.getAll(post_id)
    }

    @Post('/create')
    @UseGuards(AuthGuard())
    createComments(@GetUser() user: User, @Body() body) {
        const { content, secret, post_id } = body
        return this.commentsService.createComment({ content, secret, post_id, user })
    }

    @Put('/fix/:id')
    @UseGuards(AuthGuard())
    fixComment(@GetUser() user: User, @Param('id', ParseIntPipe) id, @Body() body) {
        const { content } = body
        return this.commentsService.fixComment({ id, content, user })
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard())
    deleteComment(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
        return this.commentsService.deleteComment({ id, user })
    }
}
