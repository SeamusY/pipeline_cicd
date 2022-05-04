import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { sns_publish_policy, cloudWatch_enabler, createPolicy } from "./IAM Configuration/Policies/index";
import { createRole, cognito_sns_text } from "./IAM Configuration/Roles";
import  { createSMSVerifier } from "./Pin Point";
import { createS3 } from "./S3/S3_bucket";
// Create an AWS resource (S3 Bucket)
let config = new pulumi.Config();
let env_name = config.require("env");
let sns_policy = createPolicy("sns_publish_policy", "SNS Publish Policy", sns_publish_policy)
let cloud_policy = createPolicy("cloud_trail_policy", "Cloud Trailer Enabler Policy", cloudWatch_enabler)
let cognito_sns = createRole("cognito_sns", cognito_sns_text)

new aws.iam.RolePolicyAttachment("sns_publisher", {
    role: cognito_sns.name,
    policyArn: sns_policy.arn
})

new aws.iam.RolePolicyAttachment("cognito_cloudWatcher", {
    role: cognito_sns.name,
    policyArn: cloud_policy.arn
})

createS3();

new aws.sns.SmsPreferences("mobile_sns_preferences", {defaultSmsType: "Transactional", monthlySpendLimit: 1, deliveryStatusIamRoleArn: cognito_sns.arn});

new aws.cognito.IdentityPool(`${env_name}-frontend-identity-pool`, {
    identityPoolName:`${env_name}-angel-earth-frontend-identity-pool`,
    allowUnauthenticatedIdentities: true
})

createSMSVerifier();

let userPool = new aws.cognito.UserPool(`${env_name}-frontend-user`, { // Check SMS region in user Pool.
    accountRecoverySetting: {
        recoveryMechanisms: [
            {
                name:"verified_phone_number",
                priority: 1
            }
        ]
    },
    mfaConfiguration: "OPTIONAL",
    smsConfiguration: {
        externalId: "sns_205_role_external_id",
        snsCallerArn: cognito_sns.arn
    },
    softwareTokenMfaConfiguration: {
        enabled: true
    },
    smsAuthenticationMessage: "Your verification code is {####}",
    usernameAttributes: ["phone_number", "email"],
    passwordPolicy: {
        minimumLength: 8,
        temporaryPasswordValidityDays: 7
    },
    autoVerifiedAttributes: ["phone_number"]
});

new aws.cognito.UserPoolClient(`${env_name}-frontend-user-web`, {
    userPoolId: userPool.id,
    callbackUrls: ["https://www.angel-earth.com/*"],
    allowedOauthFlowsUserPoolClient: true,
    allowedOauthFlows: [
        "code"
    ],
    allowedOauthScopes: [
        "email",
        "openid",
        "phone"
    ],
    supportedIdentityProviders: ["COGNITO"]
})

new aws.cognito.UserPoolClient(`${env_name}-frontend-user-mobile`, {
    userPoolId: userPool.id,
    callbackUrls: ["https://www.angel-earth.com/*"],
    allowedOauthFlowsUserPoolClient: true,
    allowedOauthFlows: [
        "code"
    ],
    allowedOauthScopes: [
        "email",
        "openid",
        "phone"
    ],
    supportedIdentityProviders: ["COGNITO"]
})