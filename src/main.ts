import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as Sentry from '@sentry/node'
import { SentryInterceptor } from './common/sentry-interceptor'
import helmet from 'helmet'

declare const module: any

async function app() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    app.use(helmet())
    Sentry.init({
        dsn: 'https://3c364e54670447db8a39419868b2eff2@o1210933.ingest.sentry.io/6346825',
    })
    app.useGlobalInterceptors(new SentryInterceptor())
    await app.listen(3000)

    if (module.hot) {
        module.hot.accept()
        module.hot.dispose(() => app.close())
    }
}
app()
