import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cloudfront } from './cloudfront';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Duration } from 'aws-cdk-lib';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const bucketArn = cdk.Fn.importValue('staticapps-bucket-arn');
    const oaiId = cdk.Fn.importValue('staticapps-oai-id');
    const acmArn = cdk.Fn.importValue('sudozone-com-cert-arn');

    const bucket = s3.Bucket.fromBucketArn(this, `${id}-bucket`, bucketArn);
    const oai = cloudfront.OriginAccessIdentity.fromOriginAccessIdentityId(this, `${id}-oai`, oaiId);
    const cf = new Cloudfront(this, `${id}-cf`, { bucket, path: id, oai, acmArn });

    new s3Deploy.BucketDeployment(this, `${id}-s3-deployment`, {
      // TODO find more elegant path solution
      sources: [s3Deploy.Source.asset('../dist')],
      destinationBucket: bucket,
      distribution: cf.distribution,
      destinationKeyPrefix: id,
      distributionPaths: ['/index.html'],
      cacheControl: [
        s3Deploy.CacheControl.maxAge(Duration.days(1)),
      ],
    });
  }
}
