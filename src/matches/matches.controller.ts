import { Body, Controller, Get, Post, Put, Query, UnauthorizedException, UseGuards } from "@nestjs/common";
import { MatchesService } from './matches.service'
import { CreateDto } from './dto/create.dto'
import { ResInterface } from '../res.interface'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../decorators'

@Controller('matches')
export class MatchesController {
    constructor(private matchesService: MatchesService) {}

    @Get()
    getAllMatches(@Query('day') day) {
        return this.matchesService.getAll(day)
    }

    @Post('create')
    @UseGuards(AuthGuard)
    createMatch(@GetUser() user, @Body() body: CreateDto): Promise<ResInterface> {
        if (user.user_status !== 2) throw new UnauthorizedException()

        const { match_day, home_away, match_type, score_home, score_away, scorer } = body
        return this.matchesService.createMatch({
            match_day,
            home_away,
            match_type,
            score_home,
            score_away,
            scorer,
        })
    }

    @Put('fix/:post_id')
    @UseGuards(AuthGuard())
    fixMatch(@Body() matchObj) {
        return this.matchesService.fixMatch(matchObj)
    }
}
