import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateDto } from './dto/create.dto'
import { NoteRepository } from "./notes.repository";
import { Note } from "./notes.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class NotesService {
    constructor (
        @InjectRepository(NoteRepository)
        private noteRepository: NoteRepository
    ) {}

    async getNoteById(id: number): Promise<Note> {
        const res = await this.noteRepository.findOne({ id })
        if (!res) throw new NotFoundException('not found')

        return res
    }
}
