import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateDto } from './dto/create.dto'
import { NoteRepository } from './notes.repository'
import { Note } from './notes.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(NoteRepository)
        private noteRepository: NoteRepository,
    ) {}

    async getNoteById(id: number): Promise<Note> {
        return this.noteRepository.getNoteById(id)
    }

    async createNote({ title, content }: CreateDto): Promise<Object> {
        try {
            return this.noteRepository.createNote({ title, content })
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException('server error')
        }
    }

    async deleteNote(id: number) {
        try {
            return this.noteRepository.deleteNote(id)
        } catch (e) {
            console.log(e)
            throw new InternalServerErrorException('server error')
        }
    }

    async updateNoteStatus(id: number) {
        return this.noteRepository.updateNoteStatus(id)
    }
}
