import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { APP_BUCKET_NAME } from '../const';

interface IProps {}

export class S3 extends Construct {
    public bucket: s3.IBucket;

    constructor(scope: Construct, id: string, props: IProps) {
        super(scope, id);

        const bucket = s3.Bucket.fromBucketName(scope, `${id}-bucket`, APP_BUCKET_NAME);

        if(!bucket.bucketArn) {
            throw new Error('Bucket not found');
        }
        this.bucket = bucket;
    }

}
