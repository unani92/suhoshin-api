import { EntityRepository, Repository } from "typeorm";
import { Note } from "./notes.entity";

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {

}
