import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
let config = new pulumi.Config();
let env_name = config.require("env");

const s3_curd: aws.iam.PolicyDocument = {
    Version: "2012-10-17",
    Statement: [
        {
            Sid: "ListYourObjects",
            Effect: "Allow",
            Action: "s3:ListBucket",
            Resource: [
                `arn:aws:s3:::${env_name}-data-ingestion-stroage`,
                `arn:aws:s3:::${env_name}-data-ingestion-stroage/*`
            ]
        },
        {
            Sid: "ReadWriteDeleteYourObjects",
            Effect: "Allow",
            Action: [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            Resource: [
                `arn:aws:s3:::${env_name}-data-ingestion-stroage`,
                `arn:aws:s3:::${env_name}-data-ingestion-stroage/*`
            ]
        }
    ]
}

export default s3_curd;