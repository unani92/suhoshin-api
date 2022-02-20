import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../decorators'
import { User } from '../auth/auth.entity'
import { StatusUpdateService } from './status-update.service'
import { FormDataRequest } from 'nestjs-form-data'

@Controller('status-update')
export class StatusUpdateController {
    constructor(private statusUpdateService: StatusUpdateService) {}

    @Get('')
    @UseGuards(AuthGuard())
    getAll(@Query('page', ParseIntPipe) page, @GetUser() user: User) {
        if (user.user_status !== 2) throw new UnauthorizedException()

        return this.statusUpdateService.getAll(page)
    }

    @Post('/create')
    @UseGuards(AuthGuard())
    @FormDataRequest()
    createRequest(@GetUser() user: User, @Body() body) {
        const { id } = user
        const { content, group_id, thumbnail = null } = body

        return this.statusUpdateService.createRequest({ user_id: id, content, group_id, thumbnail })
    }

    @Put('/handle/:id')
    @UseGuards(AuthGuard())
    handleRequest(@GetUser() user: User, @Param('id', ParseIntPipe) id: number, @Body('status') status: boolean) {
        if (user.user_status !== 2) throw new UnauthorizedException()
        const { id: user_id } = user
        return this.statusUpdateService.handleRequest(id, user_id, status)
    }
}
