import * as aws from "@pulumi/aws";

export function createWriteScalingPolicy(policy_name: string, dynamodbTableWriteTarget: aws.appautoscaling.Target) {
    return new aws.appautoscaling.Policy(policy_name, {
        policyType: "TargetTrackingScaling",
        resourceId: dynamodbTableWriteTarget.resourceId,
        scalableDimension: dynamodbTableWriteTarget.scalableDimension,
        serviceNamespace: dynamodbTableWriteTarget.serviceNamespace,
        targetTrackingScalingPolicyConfiguration: {
            predefinedMetricSpecification: {
                predefinedMetricType: "DynamoDBWriteCapacityUtilization",
            },
            targetValue: 70,
        },
    });
}