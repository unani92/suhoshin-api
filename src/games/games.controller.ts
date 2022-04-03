import { Body, Controller, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards } from '@nestjs/common'
import { GamesService } from './games.service'
import { GetUser } from '../decorators'
import { AuthGuard } from '@nestjs/passport'
import { CreateDto } from './dto/create.dto'
import { ResInterface } from '../res.interface'

@Controller('games')
export class GamesController {
    constructor(private gamesService: GamesService) {}

    @Get()
    getAllMatches(@Query('day') day) {
        return this.gamesService.getAll(day)
    }

    @Post('create')
    @UseGuards(AuthGuard())
    createMatch(@GetUser() user, @Body() body: CreateDto): Promise<ResInterface> {
        if (user.user_status !== 2) throw new UnauthorizedException()
        const { match_day, other, home_away, match_type, score_us, score_other, scorer } = body
        return this.gamesService.createMatch({
            match_day,
            other,
            home_away,
            match_type,
            score_us,
            score_other,
            scorer,
        })
    }

    @Put('fix/:post_id')
    @UseGuards(AuthGuard())
    fixMatch(@Body() matchObj, @Param('post_id') id) {
        return this.gamesService.fixMatch(id, matchObj)
    }
}
