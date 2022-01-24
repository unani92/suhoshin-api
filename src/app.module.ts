import { Module } from '@nestjs/common'
import { NotesModule } from './notes/notes.module'
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        NotesModule,
    ],
})
export class AppModule {}
