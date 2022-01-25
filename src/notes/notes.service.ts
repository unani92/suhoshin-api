import { Injectable, NotFoundException } from '@nestjs/common'
import { Note } from './notes.model'
import { CreateDto } from './dto/create.dto'

@Injectable()
export class NotesService {
    private notes: Note[] = [
        {
            id: 1,
            user: 'unani',
            title: 'title',
            content: 'asdfasfa',
        },
        {
            id: 2,
            user: 'unani',
            title: 'title',
            content: 'asdfasfa',
        },
        {
            id: 3,
            user: 'unani',
            title: 'title',
            content: 'asdfasfa',
        },
    ]

    getAll(): Note[] {
        return this.notes
    }

    getOne(id: number): Note {
        const item = this.notes.find((item) => item.id === id)
        if (!item) {
            throw new NotFoundException('404 not found!!')
        }

        return item
    }

    create({ title, content }: CreateDto): object {
        const note = {
            id: new Date().getTime(),
            title,
            content,
            user: 'unani',
        }
        this.notes.push(note)

        return {
            status: 200,
            note,
        }
    }
}
