import { Body, Controller, Post, UseGuards, Put } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../decorators'
import { User } from './auth.entity'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    signIn(@Body('accessCode') accessCode: string) {
        return this.authService.signIn(accessCode)
    }

    @Post('/me')
    @UseGuards(AuthGuard())
    loadMe(@GetUser() user: User) {
        const { id } = user
        return this.authService.searchById(id)
    }

    @Post('/test')
    test(@Body() body) {
        const { uuid, nickname, email, thumbnail } = body

        return this.authService.testSignIn({ uuid, nickname, email, thumbnail })
    }

    @Put('/edit_nickname')
    @UseGuards(AuthGuard())
    editNickname(@GetUser() user: User, @Body('nickname') nickname) {
        const { id } = user

        return this.authService.editNickname(id, nickname)
    }
}
