import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import data from "./tableConfig.json";
let config = new pulumi.Config();
let env_name = config.require("env");

function createDB() {
    new aws.dynamodb.Table("Some name", {
        
    })
}