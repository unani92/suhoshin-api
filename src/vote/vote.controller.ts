import {
    Body,
    Controller,
    Query,
    Get,
    Post,
    UnauthorizedException,
    UseGuards,
    ParseIntPipe,
    Put,
    Param,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../decorators'
import { User } from '../auth/auth.entity'
import { VoteService } from './vote.service'
import { VoteCreateDto, VoteUserCreateDto } from './dto/create.dto'
import { FormDataRequest } from 'nestjs-form-data'

@Controller('vote')
export class VoteController {
    constructor(private voteService: VoteService) {}

    // vote
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

    // vote 참여
    @Post('/user_vote')
    @UseGuards(AuthGuard())
    createUserVote(@GetUser() user: User, @Body() body: VoteUserCreateDto) {
        const { id: user_id } = user
        const { vote_id, vote_content_id } = body

        return this.voteService.createUserVote({ user_id, vote_id, vote_content_id })
    }

    @Put('/user_vote/:id')
    @UseGuards(AuthGuard())
    fixUserVote(@GetUser() user: User, @Body('vote_content_id') vote_content_id, @Param('id', ParseIntPipe) id) {
        const { id: user_id } = user

        return this.voteService.fixUserVote({ id, user_id, vote_content_id })
    }

    // vote 정보 조회
    @Get('/user_vote')
    @UseGuards(AuthGuard())
    getUserVote(@GetUser() user: User, @Query('vote_id') voteId) {
        const { id: userId } = user
        return this.voteService.getUserVote(userId, voteId)
    }

    @Get('/vote_result')
    getAllUserVote(@Query('vote_id', ParseIntPipe) voteId) {
        return this.voteService.getAllUserVote(voteId)
    }
}
