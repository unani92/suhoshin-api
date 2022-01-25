import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { NotesService } from './notes.service'
import { CreateDto } from './dto/create.dto'

@Controller('notes')
export class NotesController {
    constructor(private noteService: NotesService) {}

    @Get()
    getAll() {
    }

    @Get('/:id')
    getItem(@Param('id') id: string) {
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    create(@Body() body: CreateDto) {
    }
}
