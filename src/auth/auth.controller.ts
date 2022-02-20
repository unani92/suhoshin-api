import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    signIn(@Body('authToken') authToken: string) {
        return this.authService.signIn(authToken)
    }

    @Post('/test')
    test(@Body() body) {
        const { uuid, nickname, email, thumbnail } = body

        return this.authService.testSignIn({ uuid, nickname, email, thumbnail })
    }
}
