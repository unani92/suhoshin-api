import { Controller, Get, Param, Query, Headers, Post, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateDto } from "./dto/create.dto";

@Controller('notes')
export class NotesController {
    constructor(private noteService: NotesService) {}

    @Get()
    getAll() {
        return this.noteService.getAll()
    }

    @Get('/:id')
    getItem(@Param('id') id: string) {
        return this.noteService.getOne(Number(id))
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    create(@Body() body: CreateDto) {
        return this.noteService.create(body)
    }
}
