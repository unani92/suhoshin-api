import {
    Controller,
    Get,
    Delete,
    Post,
    Put,
    Param,
    Body,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common'
import { NotesService } from './notes.service'
import { CreateDto } from './dto/create.dto'
import { Note } from './notes.entity'
import { AuthGuard } from '@nestjs/passport'

@Controller('notes')
export class NotesController {
    constructor(private noteService: NotesService) {}

    @Get()
    getAll() {}

    @Get('/:id')
    @UseGuards(AuthGuard())
    getNoteById(@Param('id', ParseIntPipe) id): Promise<Note> {
        return this.noteService.getNoteById(id)
    }

    @Put('/:id')
    @UseGuards(AuthGuard())
    updateNoteStatus(@Param('id', ParseIntPipe) id): Promise<Object> {
        return this.noteService.updateNoteStatus(id)
    }

    @Post('/create')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    create(@Body() { title, content }: CreateDto) {
        return this.noteService.createNote({ title, content })
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteNote(@Param('id', ParseIntPipe) id: string) {
        return this.noteService.deleteNote(Number(id))
    }
}
