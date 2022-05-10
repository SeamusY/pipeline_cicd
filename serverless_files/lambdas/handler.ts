
export const handler = async (event: any, context: any) => {
    console.log(event);
    console.log(context);
    return {
        statusCode: 200,
        message: `Hello! path from ${event.path}!`,
        method: `Method is ${event.method}!`,
    }
}