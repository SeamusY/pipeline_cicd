import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
export function createAppWriteTarget(name: string, resouceId: pulumi.Output<string>, isGlobalIndex: boolean ) {
    if(isGlobalIndex) {
        return new aws.appautoscaling.Target(name, {
            maxCapacity: 10,
            minCapacity: 1,
            resourceId: resouceId,
            scalableDimension: "dynamodb:index:WriteCapacityUnits",
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