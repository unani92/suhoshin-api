import { Body, Controller, Get, Post, Put, Req, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { CreateDto } from './dto/create.dto'
import { User } from './auth.entity'
import { GetUser } from '../decorators'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    // @UseGuards(AuthGuard('kakao'))
    // @UsePipes(ValidationPipe)
    signIn(@Body('authToken') authToken: string) {
        return this.authService.signIn(authToken)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user)
    }

    // @Put('/')
}
