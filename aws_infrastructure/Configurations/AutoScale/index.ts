import { createAppReadTarget } from "./dynamo_auto_read";
import { createAppWriteTarget } from "./dynamo_auto_write";
import { createReadScalingPolicy } from "./db_read_auto_scale_policy";
import { createWriteScalingPolicy } from "./db_write_auto_scaling_policy";

export { createAppReadTarget, createAppWriteTarget, createReadScalingPolicy, createWriteScalingPolicy };