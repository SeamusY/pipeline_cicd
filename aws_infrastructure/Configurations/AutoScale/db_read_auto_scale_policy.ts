import * as aws from "@pulumi/aws";

export function createReadScalingPolicy(policy_name: string, dynamodbTableReadTarget: aws.appautoscaling.Target) {
    return new aws.appautoscaling.Policy(policy_name, {
        policyType: "TargetTrackingScaling",
        resourceId: dynamodbTableReadTarget.resourceId,
        scalableDimension: dynamodbTableReadTarget.scalableDimension,
        serviceNamespace: dynamodbTableReadTarget.serviceNamespace,
        targetTrackingScalingPolicyConfiguration: {
            predefinedMetricSpecification: {
                predefinedMetricType: "DynamoDBReadCapacityUtilization",
            },
            targetValue: 70,
        },
    });
}