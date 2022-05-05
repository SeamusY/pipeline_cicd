import * as aws from "@pulumi/aws";

export function createAppWriteTarget(name: string, resouceId: string, isGlobalIndex: boolean ) {
    if(isGlobalIndex) {
        return new aws.appautoscaling.Target(name, {
            maxCapacity: 10,
            minCapacity: 1,
            resourceId: resouceId,
            scalableDimension: "dynamodb:index:ReadCapacityUnits",
            serviceNamespace: "dynamodb",
        });
    } else {
        return new aws.appautoscaling.Target(name, {
            maxCapacity: 10,
            minCapacity: 1,
            resourceId: resouceId,
            scalableDimension: "dynamodb:table:WriteCapacityUnits",
            serviceNamespace: "dynamodb",
        });
    }
}