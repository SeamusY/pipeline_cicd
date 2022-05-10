import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { createAppReadTarget, createAppWriteTarget, createReadScalingPolicy, createWriteScalingPolicy } from "../Configurations/AutoScale";
import { Dynamo_global_secondary_index } from "../types";
let data = require("./tableConfig.json");
let config = new pulumi.Config();
let env_name = config.require("env");

export function createDB() {
        data.forEach((element: any) => {
            let table =  new aws.dynamodb.Table(`${env_name}-${element.tableName}`, {
                attributes: element.attributes,
                billingMode: element.billingMode,
                globalSecondaryIndexes: element.globalSecondaryIndexes,
                hashKey: element.hashKey,
                writeCapacity: element.writeCapacity,
                readCapacity: element.readCapacity,
            })

            let targetRead = createAppReadTarget(`${env_name}-${element.tableName}-read-target`, pulumi.interpolate`table/${table.name}`, false);
            let targetWrite= createAppWriteTarget(`${env_name}-${element.tableName}-write-target`, pulumi.interpolate`table/${table.name}`, false);
            if(element.globalSecondaryIndexes.length > 0) { 
                element.globalSecondaryIndexes.forEach((object: Dynamo_global_secondary_index) => {
                    let objectReadTarget = createAppReadTarget(`${env_name}-${element.tableName}-${object.name}-read-target`, pulumi.interpolate`table/${table.name}/index/${object.name}`, true);
                    let objectWriteTarget = createAppWriteTarget(`${env_name}-${element.tableName}-${object.name}-write-target`, pulumi.interpolate`table/${table.name}/index/${object.name}`, true);
                    createReadScalingPolicy(`${env_name}-${element.tableName}-${object.name}-read-auto-scale-policy`, objectReadTarget);
                    createWriteScalingPolicy(`${env_name}-${element.tableName}-${object.name}-write-auto-scale-policy`, objectWriteTarget);
                });
            }
            createReadScalingPolicy(`${env_name}-${element.tableName}-read-auto-scale-policy`, targetRead);
            createWriteScalingPolicy(`${env_name}-${element.tableName}-write-auto-scale-policy`, targetWrite);
        });
}