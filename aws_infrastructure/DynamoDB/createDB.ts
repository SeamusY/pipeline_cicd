import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { createAppReadTarget, createAppWriteTarget, createReadScalingPolicy, createWriteScalingPolicy } from "../Configurations/AutoScale"
let data = require("./tableConfig.json");
let config = new pulumi.Config();
let env_name = config.require("env");

export function createDB() {
    // try {
        // let targetRead = new aws.appautoscaling.Target(`dev-files-fdd2bd3-read-target`, {
        //     maxCapacity: 10,
        //     minCapacity: 1,
        //     resourceId: "table/dev-files-fdd2bd3",
        //     scalableDimension: "dynamodb:table:ReadCapacityUnits",
        //     serviceNamespace: "dynamodb",
        // });
        // let targetWrite = new aws.appautoscaling.Target(`dev-files-fdd2bd3-write-target`, {
        //     maxCapacity: 10,
        //     minCapacity: 1,
        //     resourceId: "table/dev-files-fdd2bd3",
        //     scalableDimension: "dynamodb:table:WriteCapacityUnits",
        //     serviceNamespace: "dynamodb",
        // });
        data.forEach((element: any) => {
            let table =  new aws.dynamodb.Table(`${env_name}-${element.tableName}`, {
                attributes: element.attributes,
                billingMode: element.billingMode,
                globalSecondaryIndexes: element.globalSecondaryIndexes,
                hashKey: element.hashKey,
                writeCapacity: element.writeCapacity,
                readCapacity: element.readCapacity,
            })

            let targetRead = new aws.appautoscaling.Target(`${env_name}-${element.tableName}-read-target`, {
                maxCapacity: 10,
                minCapacity: 1,
                resourceId: pulumi.interpolate`table/${table.name}`,
                scalableDimension: "dynamodb:table:ReadCapacityUnits",
                serviceNamespace: "dynamodb",
            });
            let targetWrite = new aws.appautoscaling.Target(`${env_name}-${element.tableName}-write-target`, {
                maxCapacity: 10,
                minCapacity: 1,
                resourceId: pulumi.interpolate`table/${table.name}`,
                scalableDimension: "dynamodb:table:WriteCapacityUnits",
                serviceNamespace: "dynamodb",
            });
        });
        // pulumi.output(tables).apply(item => {
        //     let name = data.find((element: { tableName: string; }) => element.tableName === item.name);
        //     let targetRead = new aws.appautoscaling.Target(`${env_name}-${name}-read-target`, {
        //         maxCapacity: 10,
        //         minCapacity: 1,
        //         resourceId: pulumi.interpolate`table/${item.name}-${item.id}`,
        //         scalableDimension: "dynamodb:table:ReadCapacityUnits",
        //         serviceNamespace: "dynamodb",
        //     });
        //     let targetWrite = new aws.appautoscaling.Target(`${env_name}${name}-write-target`, {
        //         maxCapacity: 10,
        //         minCapacity: 1,
        //         resourceId: pulumi.interpolate`table/${item.name}-${item.id}`,
        //         scalableDimension: "dynamodb:table:WriteCapacityUnits",
        //         serviceNamespace: "dynamodb",
        //     });
        // });
        // tables.forEach((element: any, index: number) => {
        //     let targetRead = new aws.appautoscaling.Target(`${env_name}-${element.name}-read-target`, {
        //         maxCapacity: 10,
        //         minCapacity: 1,
        //         resourceId: `table/${env_name}-${element.name}-${element.id}`,
        //         scalableDimension: "dynamodb:table:ReadCapacityUnits",
        //         serviceNamespace: "dynamodb",
        //     });
        //     let targetWrite = new aws.appautoscaling.Target(`${env_name}-${element.name}-write-target`, {
        //         maxCapacity: 10,
        //         minCapacity: 1,
        //         resourceId: `table/${env_name}-${element.name}-${element.id}`,
        //         scalableDimension: "dynamodb:table:WriteCapacityUnits",
        //         serviceNamespace: "dynamodb",
        //     });
        // });
        // let targetRead = createAppReadTarget(`${env_name}-${element.tableName}-read-target`, String(table.id), false);
        // let targetWrite = createAppWriteTarget(`${env_name}-${element.tableName}-write-target`, String(table.id), false);
        // createReadScalingPolicy(`${env_name}-${element.tableName}-read-auto-scale-policy`, targetRead);
        // createWriteScalingPolicy(`${env_name}-${element.tableName}-write-auto-scale-policy`, targetWrite);
        // })
}