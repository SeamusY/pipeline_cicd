import * as aws from "@pulumi/aws";

export const sns_publish_policy: aws.iam.PolicyDocument = {
    Version: "2012-10-17",
    Statement: [
        {
            Action: [
                "sns:Publish"
            ],
            Resource: "*",
            Effect: "Allow"
        }
    ]
}