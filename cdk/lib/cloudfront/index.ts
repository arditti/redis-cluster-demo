import { Construct } from 'constructs';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cfOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import { CfnOutput } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { APP_DOMAIN } from '../const';

interface IProps {
    bucket: s3.IBucket,
    path: string,
    oai: cf.IOriginAccessIdentity,
    acmArn: string,
}

export class Cloudfront extends Construct {
    public distribution: cf.Distribution;

    constructor(scope: Construct, id: string, props: IProps) {
        super(scope, id);

        const origin = new cfOrigins.S3Origin(props.bucket, {
            originAccessIdentity: props.oai,
            originPath: `/${props.path}`
        });

        this.distribution = new cf.Distribution(this, `${id}-distribution`, {
            comment: APP_DOMAIN,
            domainNames: [APP_DOMAIN],
            defaultRootObject: 'index.html',
            certificate: acm.Certificate.fromCertificateArn(this, `acm-cert-${APP_DOMAIN}`, props.acmArn),
            defaultBehavior: {
                origin,
                compress: true,
                cachePolicy: cf.CachePolicy.CACHING_OPTIMIZED,
                viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            errorResponses: [
                { httpStatus: 404, responseHttpStatus: 200, responsePagePath: '/index.html', },
            ],
        });
        new CfnOutput(this, `distribution-${id}-url`, { value: `https://${this.distribution.domainName}`, });
    }
}
