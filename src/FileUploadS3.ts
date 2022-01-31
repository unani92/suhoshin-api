import { S3 } from 'aws-sdk'
import { Logger, Injectable } from '@nestjs/common'

@Injectable()
export class FileUploadService {
    async upload(file, path) {
        const { originalName } = file
        const bucketS3 = 'suhoshin-photo'
        const { Location }: any = await this.uploadS3(
            file.buffer,
            bucketS3,
            `${path}/${new Date().getTime()}_${originalName}`,
        )
        return Location
    }

    async uploadS3(file, bucket, name) {
        const s3 = this.getS3()

        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        }
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    Logger.error(err)
                    reject(err.message)
                }
                resolve(data)
            })
        })
    }

    getS3() {
        return new S3({
            accessKeyId: process.env.NEST_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEST_AWS_SECRET_ACCESS_KEY,
        })
    }
}
