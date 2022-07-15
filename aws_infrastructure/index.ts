import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { sns_publish_policy, cloudWatch_enabler, createPolicy, s3_curd, cognito_enabler_policy } from "./Configurations/Policies/index";
import { createRole, cognito_sns_text, authenticated_roles } from "./Configurations/Roles";
import  { createSMSVerifier } from "./Pin Point";
// import { createS3 } from "./S3";
import { createDB } from "./DynamoDB";
// import { createApi } from "./Api Gateway";
// Create an AWS resource (S3 Bucket)
let config = new pulumi.Config();
let env_name = config.require("env");
// Policies 
let sns_policy = createPolicy("sns_publish_policy", "SNS Publish Policy", sns_publish_policy)
let cloud_policy = createPolicy("cloud_trail_policy", "Cloud Trailer Enabler Policy", cloudWatch_enabler)
let s3_curd_policy = createPolicy("user_crud_s3_policy", "Users can list, get, update and delete", s3_curd)
let cognito_policy = createPolicy("cognito_policy", "users can access all user pool functions", cognito_enabler_policy)

// Roles
let cognito_sns = createRole("cognito_sns", cognito_sns_text, { "primary_role": "SNS" })
let cognito_authenticated_roles = createRole("cognito_authorise_roles", authenticated_roles, { "primary_role": "Authenticate users" })
//Attach Policies to Roles 

new aws.iam.RolePolicyAttachment("authorised_users", {
    role: cognito_authenticated_roles.name,
    policyArn: s3_curd_policy.arn
})

new aws.iam.RolePolicyAttachment("authorised_users_all_cognito_enabled", {
    role: cognito_authenticated_roles.name,
    policyArn: cognito_policy.arn
})

new aws.iam.RolePolicyAttachment("sns_publisher", {
    role: cognito_sns.name,
    policyArn: sns_policy.arn
})

new aws.iam.RolePolicyAttachment("cognito_cloudWatcher", {
    role: cognito_sns.name,
    policyArn: cloud_policy.arn
})

//S3 Bucket
// createS3();
new aws.s3.Bucket(`${env_name}-data-ingestion-stroage`);
new aws.s3.Bucket(`${env_name}-data-ingestion-stroage-logs`);
// Amazon Pin Point
new aws.sns.SmsPreferences("mobile_sns_preferences", {defaultSmsType: "Transactional", monthlySpendLimit: 1, deliveryStatusIamRoleArn: cognito_sns.arn});
createSMSVerifier();

//Create DB
createDB();

// Cognito User Pool
let primary_userPool = new aws.cognito.IdentityPool(`${env_name}-frontend-identity-pool`, {
    identityPoolName:`${env_name}-angel-earth-frontend-identity-pool`,
    allowUnauthenticatedIdentities: true
})

new aws.cognito.IdentityPoolRoleAttachment("primaryIdentityPoolRoleAttachment", {
    identityPoolId: primary_userPool.id,
    roles: {
        authenticated: cognito_authenticated_roles.arn,
    },
});

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
    callbackUrls: ["/*"],
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

// createApi(); // Create API Gateway
