import { Body, Controller, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../decorators'
import { User } from '../auth/auth.entity'
import { VoteService } from "./vote.service";
import { VoteCreateDto } from "./dto/create.dto";

@Controller('vote')
export class VoteController {
    constructor(private voteService: VoteService) {
    }

    @Post('/create')
    @UseGuards(AuthGuard())
    create(@GetUser() user: User, @Body() body: VoteCreateDto) {
        if (user.user_status !== 2) throw new UnauthorizedException()
        const { title, content, expire_at, thumbnail } = body
        return this.voteService.create({ title, content, expire_at, thumbnail })
    }
}
