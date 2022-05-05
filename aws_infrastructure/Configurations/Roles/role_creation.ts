import * as aws from "@pulumi/aws";
export function createRole(name: string, policy: aws.iam.PolicyDocument, tags?: any) {
    return new aws.iam.Role(name, {
        assumeRolePolicy: JSON.stringify(policy),
        tags: tags
    });
}