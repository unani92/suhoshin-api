import { Body, Controller, Get, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateDto } from './dto/create.dto'
import { User } from './auth.entity'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    @UsePipes(ValidationPipe)
    signIn(
        @Body() { uuid, email, nickname }: CreateDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn({ uuid, email, nickname })
    }

    // @Put('/')
}
