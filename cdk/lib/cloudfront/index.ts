import { Construct } from 'constructs';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cfOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { APP_DOMAIN, APP_DOMAIN_CERT_ARN } from '../const';
import { CachePolicyProps } from 'aws-cdk-lib/aws-cloudfront/lib/cache-policy';

interface IProps {
    bucket: s3.IBucket,
}

export class Cloudfront extends Construct {
    public distribution: cf.Distribution;

    constructor(scope: Construct, id: string, props: IProps) {
        super(scope, id);

        const originAccessIdentity = new cf.OriginAccessIdentity(this, `${id}-oai`, {
            comment: id
        });
        props.bucket.grantRead(originAccessIdentity);

        const cachePolicyProps: CachePolicyProps = {
            comment: `${id} app cache policy`,
            queryStringBehavior: cf.CacheQueryStringBehavior.all(),
            maxTtl: Duration.days(30),
            minTtl: Duration.days(30),
            defaultTtl: Duration.days(30),
            enableAcceptEncodingBrotli: true,
            enableAcceptEncodingGzip: true
        };

        const cachePolicy = new cf.CachePolicy(this, `${id}-app-cache-policy`, cachePolicyProps);

        this.distribution = new cf.Distribution(this, `${id}-distribution`, {
            comment: APP_DOMAIN,
            domainNames: [APP_DOMAIN],
            certificate: acm.Certificate.fromCertificateArn(this, `acm-cert-${APP_DOMAIN}`, APP_DOMAIN_CERT_ARN),
            defaultBehavior: {
                origin: new cfOrigins.S3Origin(props.bucket, { originAccessIdentity, originPath: `/${id}` }), // BUG - /${id} including the cf suffix
                viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                compress: true,
                cachePolicy,
            },
            defaultRootObject: 'index.html',
            errorResponses: [
                { httpStatus: 404, responseHttpStatus: 200, responsePagePath: '/index.html', },
            ],
        });
        new CfnOutput(this, `distribution-${id}-url`, { value: `https://${this.distribution.domainName}`, });
    }
}
