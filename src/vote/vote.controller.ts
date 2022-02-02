import { Body, Controller, Query, Get, Post, UnauthorizedException, UseGuards, ParseIntPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../decorators'
import { User } from '../auth/auth.entity'
import { VoteService } from './vote.service'
import { VoteCreateDto } from './dto/create.dto'
import { FormDataRequest } from 'nestjs-form-data'

@Controller('vote')
export class VoteController {
    constructor(private voteService: VoteService) {}

    @Get()
    @UseGuards(AuthGuard())
    getAll(@Query('page', ParseIntPipe) page) {
        return this.voteService.getAll(page)
    }

    @Post('/create')
    @UseGuards(AuthGuard())
    @FormDataRequest()
    create(@GetUser() user: User, @Body() body: VoteCreateDto) {
        if (user.user_status !== 2) throw new UnauthorizedException()

        const { title, content, expire_at, thumbnail, voteContents } = body
        const voteContentsArr = voteContents.split(',')
        return this.voteService.create({ title, content, expire_at, thumbnail, voteContents: voteContentsArr })
    }
}
