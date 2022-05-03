import * as aws from "@pulumi/aws";
export const cognito_sns_text: aws.iam.PolicyDocument = {
    Version: "2012-10-17",
    Statement: [
        {
            Sid: "",
            Effect: "Allow",
            Principal: {
                Service: "cognito-idp.amazonaws.com"
            },
            Action: "sts:AssumeRole"
        },
        {
            Effect: "Allow",
            Principal: {
                Service: "sns.amazonaws.com"
            },
            Action: "sts:AssumeRole"
        }
    ]
}