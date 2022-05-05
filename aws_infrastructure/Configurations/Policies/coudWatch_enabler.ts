import * as aws from "@pulumi/aws";

export const cloudWatch_enabler: aws.iam.PolicyDocument = {
    Version: "2012-10-17",
    Statement: [
        {
            Effect: "Allow",
            Action: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:PutMetricFilter",
                "logs:PutRetentionPolicy"
            ],
            Resource: [
                "*"
            ]
        }
    ]
}