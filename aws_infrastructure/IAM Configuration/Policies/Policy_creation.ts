import * as aws from "@pulumi/aws";

export function createPolicy(name: string, description: string, policy: aws.iam.PolicyDocument) {
    return new aws.iam.Policy(name, {
        description: description,
        policy: policy
    });
}