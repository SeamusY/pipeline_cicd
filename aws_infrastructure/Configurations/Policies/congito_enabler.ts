import * as aws from "@pulumi/aws";

export const cognito_enabler_policy: aws.iam.PolicyDocument = {
    Version: "2012-10-17",
    Statement: [
        {
            Effect: "Allow",
            Action: [
                "cognito-identity:*"
            ],
            Resource: [
                "*"
            ]
        }
    ]
}