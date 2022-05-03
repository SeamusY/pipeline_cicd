import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { sns_publish_policy, cloudWatch_enabler, createPolicy } from "./IAM Configuration/Policies/index";
import { createRole, cognito_sns_text } from "./IAM Configuration/Roles";
// Create an AWS resource (S3 Bucket)
let config = new pulumi.Config();
let env_name = config.require("env");
let sns_policy = createPolicy("sns_publish_policy", "SNS Publish Policy", sns_publish_policy)
let cloud_policy = createPolicy("cloud_trail_policy", "Cloud Trailer Enabler Policy", cloudWatch_enabler)
let cognito_cloud_watch_sns = createRole("cognito_cloud_watch_sns", cognito_sns_text)

new aws.iam.RolePolicyAttachment("sns_cognito_policy", {
    role: cognito_cloud_watch_sns.name,
    policyArn: sns_policy.arn
})

new aws.iam.RolePolicyAttachment("sns_cognito_policy", {
    role: cognito_cloud_watch_sns.name,
    policyArn: cloud_policy.arn
})

new aws.sns.SmsPreferences("mobile_sns_preferences", {defaultSmsType: "Transactional", monthlySpendLimit: 1, deliveryStatusIamRoleArn: cloud_policy.arn});
new aws.s3.Bucket(`${env_name}-data-ingestion-stroage`); // S3
// let identityPool = new aws.cognito.IdentityPool(`${env_name}-frontend-user-pool`, {
//     allowUnauthenticatedIdentities: true,
// })
new aws.cognito.UserPool(`${env_name}-frontend-user`, {
    mfaConfiguration: "OPTIONAL",
    smsVerificationMessage: "Your verification code is {####}",
    usernameAttributes: ["phone_number"],
    passwordPolicy: {
        minimumLength: 8
    }
}); // Cognito
