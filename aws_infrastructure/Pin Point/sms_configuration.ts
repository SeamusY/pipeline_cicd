import * as aws from "@pulumi/aws";

export function createSMSVerifier() {
    let app = new aws.pinpoint.App("sms_verifier");
    new aws.pinpoint.SmsChannel("sms_verifier", {
        applicationId: app.id,
        enabled: true,
        senderId: "Angel-Earth",
        shortCode: "AE"
    })
}