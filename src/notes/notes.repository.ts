import { EntityRepository, Repository } from "typeorm";
import { Note } from "./notes.entity";
import { CreateDto } from "./dto/create.dto";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {

    async getNoteById(id: number): Promise<Note> {
        const res = await this.findOne({ id })
        if (!res) throw new NotFoundException('not found')

        return res
    }

    async createNote({ title, content }: CreateDto) {

        const note = await this.create({
            title,
            content
        })
        this.save(note)
        return {
            content: note,
            status: 200,
            msg: 'ok',
        }
    }
}
