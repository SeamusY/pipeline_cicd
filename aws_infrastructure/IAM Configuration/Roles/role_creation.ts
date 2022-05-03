import * as aws from "@pulumi/aws";
export function createRole(name: string, policy: aws.iam.PolicyDocument) {
    return new aws.iam.Role(name, {
        assumeRolePolicy: JSON.stringify(policy),
        tags: {
            "primary_role": "SNS",
            "function": "send"
        }
    });
}