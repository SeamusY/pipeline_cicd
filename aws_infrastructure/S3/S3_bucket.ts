import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
let config = new pulumi.Config();
let env_name = config.require("env");

export function createS3() {
    new aws.s3.Bucket(`${env_name}-data-ingestion-stroage`); // S3
    new aws.s3.Bucket(`${env_name}-data-ingestion-stroage-logs`); // S3
}