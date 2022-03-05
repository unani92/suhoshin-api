import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../decorators'
import { User } from './auth.entity'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    signIn(@Body('authToken') authToken: string) {
        return this.authService.signIn(authToken)
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
}
