import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

declare const module: any

async function app() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(3000)

    if (module.hot) {
        module.hot.accept()
        module.hot.dispose(() => app.close())
    }
}
app()
