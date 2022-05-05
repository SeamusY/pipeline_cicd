import * as aws from "@pulumi/aws";

export const authenticated_roles: aws.iam.PolicyDocument = {
    Version: "2012-10-17",
    Statement: [
        {
            Effect: "Allow",
            Principal: {
                Federated: [
                    "cognito-idp.amazonaws.com",
                    "cognito-identity.amazonaws.com"
                ]
            },
            Action: "sts:AssumeRoleWithWebIdentity",
            Condition: {
                StringEquals: {
                    "cognito-identity.amazonaws.com:aud": "ca-central-1:4c02faa9-f211-497c-9dc3-456e09be7e18"
                },
                "ForAnyValue:StringLike": {
                    "cognito-identity.amazonaws.com:amr": "authenticated"
                }
            }
        }
    ]
}