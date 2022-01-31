import { Body, Controller, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../decorators'
import { User } from '../auth/auth.entity'
import { VoteService } from "./vote.service";
import { VoteCreateDto } from "./dto/create.dto";
import { FormDataRequest } from "nestjs-form-data";

@Controller('vote')
export class VoteController {
    constructor(private voteService: VoteService) {
    }

    @Post('/create')
    @FormDataRequest()
    // @UseGuards(AuthGuard())
    create(@Body() body: VoteCreateDto) {
        // if (user.user_status !== 2) throw new UnauthorizedException()
        console.log(body)
        const { title, content, expire_at, thumbnail } = body
        return this.voteService.create({ title, content, expire_at, thumbnail })
    }
}
