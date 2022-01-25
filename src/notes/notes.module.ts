import { Module } from '@nestjs/common'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoteRepository } from "./notes.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([NoteRepository])
    ],
    controllers: [NotesController],
    providers: [NotesService],
})
export class NotesModule {}
