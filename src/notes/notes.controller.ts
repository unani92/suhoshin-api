import {
    Controller,
    Get,
    Delete,
    Post,
    Param,
    Body,
    UsePipes,
    ValidationPipe, ParseIntPipe
} from "@nestjs/common";
import { NotesService } from './notes.service'
import { CreateDto } from './dto/create.dto'
import { Note } from "./notes.entity";

@Controller('notes')
export class NotesController {
    constructor(private noteService: NotesService) {}

    @Get()
    getAll() {
    }

    @Get('/:id')
    getNoteById(@Param('id', ParseIntPipe) id: string): Promise<Note> {
        return this.noteService.getNoteById(Number(id))
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    create(@Body() { title, content }: CreateDto) {
        return this.noteService.createNote({ title, content })
    }

    @Delete('/:id')
    deleteNote(@Param('id', ParseIntPipe) id: string) {
        return this.noteService.deleteNote(Number(id))
    }
}
