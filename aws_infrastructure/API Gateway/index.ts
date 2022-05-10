import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as crypto from "crypto";
// import * as apigateway from "@pulumi/aws-apigateway";
let config = new pulumi.Config();
let env_name = config.require("env");
export function createApi() { //Need to pass pool ARN to give aws api gateway access to any lambdas.\

    // let gateway = new apigateway.RestAPI(`${env_name}-files-ingestion-project-api-2`, {
    //     routes: [
    //         {
    //             path: "proxy",
    //             target: {
    //                 type: "http_proxy",
    //                 uri: "https://www.google.com",
    //             },
    //         },
    //         // {
    //         //     path: "cognito-authorized",
    //         //     method: "GET",
    //         //     data: {
    //         //         "200": {
    //         //             "description": "a pet to be returned",
    //         //             "content": {
    //         //                 "application/json": {
    //         //                     "schema": {
    //         //                         "type": "object",
    //         //                         "properties": {
    //         //                             "message": {
    //         //                                 "type": "string",
    //         //                                 "description": "message to be returned",
    //         //                             }
    //         //                         }
    //         //                     }
    //         //                 }
    //         //             },
    //         //         },
    //         //         // Use Cognito as authorizer to validate the token from the Authorization header
    //         //         authorizers: [
    //         //             {
    //         //                 parameterName: "Authorization",
    //         //                 identitySource: ["method.request.header.Authorization"],
    //         //                 providerARNs: ["arn:aws:cognito-identity:ca-central-1:918559970238:identitypool/ca-central-1:e849dfae-4491-4f5b-b37c-fef7caef1c99"],
    //         //             },
    //         //         ],
    //         //     },
    //         // },
    //         {
    //             path: "/Api_Testing",
    //             method: "GET",
    //             data: {
    //                 "x-amazon-apigateway-integration": {
    //                     httpMethod: "GET",
    //                     passthroughBehavior: "when_no_match",
    //                     type: "http_proxy",
    //                     uri: "https://httpbin.org/uuid",
    //                 },
    //             }
    //         },
    //     ],
    // })

    // let lambda = aws.lambda.Function.get("API_Gateway-Lambda", "arn:aws:lambda:ca-central-1:432137912160:function:API_Gateway-Lambda");
    // });")

    let sample = new aws.apigateway.RestApi(`${env_name}-files-ingestion-project-api`, {
        body: JSON.stringify({
            openapi: "3.0.1",
            info: {
                title: "example",
                version: "1.0",
            },
            paths: {
                "/": {
                    get: {
                        responses: {
                            "200": {
                                description: "successful operation",
                                headers: {
                                    "Content-Type": {
                                        type: "string",
                                        description: "Media type of request"
                                    },
                                }
                            }
                        },
                        "x-amazon-apigateway-integration": {
                            responses: {
                                default: {
                                    statusCode: "200",
                                    "responseParameters": {
                                        "method.response.header.Content-Type": "'application/json'"
                                    },
                                    "responseTemplates": {
                                        "application/json": "{status: 200, message: 'OK'}"
                                    },
                                }
                            },
                            "requestTemplates": {
                                "application/json": "{\"statusCode\": 200}"
                            },
                            "passthroughBehavior": "when_no_match",
                            "type": "mock"
                        }
                    },
                    post: {
                        responses: {
                            "200": {
                                description: "successful operation",
                                headers: {
                                    "Content-Type": {
                                        type: "string",
                                        description: "Media type of request"
                                    },
                                }
                            }
                        },
                        "x-amazon-apigateway-integration": {
                            responses: {
                                default: {
                                    statusCode: "200",
                                    "responseParameters": {
                                        "method.response.header.Content-Type": "'application/json'"
                                    },
                                    "responseTemplates": {
                                        "application/json": "{status: 200, message: 'OK POST SUCCESSFUL'}"
                                    },
                                }
                            },
                            "requestTemplates": {
                                "application/json": "{\"statusCode\": 200}"
                            },
                            "passthroughBehavior": "when_no_match",
                            "type": "mock"
                        }
                    }
                },
                "/cognito_verification": {
                    get: {
                        // "security": [{
                        //     "type": "apiKey",
                        //     "name": "Authorization",
                        //     "in": "header",
                        //     "x-amazon-apigateway-authtype": "cognito_user_pools",
                        //     "x-amazon-apigateway-authorizer": {
                        //         "type": "cognito_user_pools",
                        //         "providerARNs": [
                        //             "arn:aws:cognito-identity:ca-central-1:918559970238:identitypool/ca-central-1:e849dfae-4491-4f5b-b37c-fef7caef1c99"
                        //         ]
                        //     }
                        // }
                        // ],
                        responses: {
                            "200": {
                                description: "successful operation",
                                headers: {
                                    "Content-Type": {
                                        type: "string",
                                        description: "Media type of request"
                                    },
                                }
                            }
                        },
                        "x-amazon-apigateway-integration": {
                            responses: {
                                default: {
                                    statusCode: "200",
                                    "responseParameters": {
                                        "method.response.header.Content-Type": "'application/json'"
                                    },
                                    "responseTemplates": {
                                        "application/json": "{status: 200, message: 'OK GET COGNITO SUCCESSFUL'}"
                                    },
                                }
                            },
                            "requestTemplates": {
                                "application/json": "{\"statusCode\": 200}"
                            },
                            "passthroughBehavior": "when_no_match",
                            "type": "mock"
                        }
                    }
                },
                "/health_check": {
                    "get": {
                        responses: {
                            "200": {
                                description: "successful operation",
                                headers: {
                                    "Content-Type": {
                                        type: "string",
                                        description: "Media type of request"
                                    },
                                }
                            }
                        },
                        "x-amazon-apigateway-integration": {
                            responses: {
                                default: {
                                    statusCode: "200",
                                    "responseParameters": {
                                        "method.response.header.Content-Type": "'application/json'"
                                    },
                                    "responseTemplates": {
                                        "application/json": "{status: 200, message: 'OK HEALTH CHECK'}"
                                    },
                                }
                            },
                            "requestTemplates": {
                                "application/json": "{\"statusCode\": 200}"
                            },
                            "passthroughBehavior": "when_no_match",
                            "type": "mock"
                        }
                    },
                },
                "/users": {
                    "get": {
                        responses: {
                            "200": {
                                description: "successful operation",
                                headers: {
                                    "Content-Type": {
                                        type: "string",
                                        description: "Media type of request"
                                    },
                                }
                            }
                        },
                        "x-amazon-apigateway-integration": {
                            responses: {
                                default: {
                                    statusCode: "200",
                                    "responseParameters": {
                                        "method.response.header.Content-Type": "'application/json'"
                                    },
                                    "responseTemplates": {
                                        "application/json": "{status: 200, message: 'OK USERS SUCCESSFUL'}"
                                    },
                                }
                            },
                            "requestTemplates": {
                                "application/json": "{\"statusCode\": 200}"
                            },
                            "passthroughBehavior": "when_no_match",
                            "type": "mock"
                        }
                    }
                },
                "/files": {
                    "get": {
                        responses: {
                            "200": {
                                description: "successful operation",
                                headers: {
                                    "Content-Type": {
                                        type: "string",
                                        description: "Media type of request"
                                    },
                                }
                            }
                        },
                        "x-amazon-apigateway-integration": {
                            responses: {
                                default: {
                                    statusCode: "200",
                                    "responseParameters": {
                                        "method.response.header.Content-Type": "'application/json'"
                                    },
                                    "responseTemplates": {
                                        "application/json": "{status: 200, message: 'OK FILES CHECK'}"
                                    },
                                }
                            },
                            "requestTemplates": {
                                "application/json": "{\"statusCode\": 200}"
                            },
                            "passthroughBehavior": "when_no_match",
                            "type": "mock"
                        }
                    },
                },
                "/invoices": {
                    "get": {
                        responses: {
                            "200": {
                                description: "successful operation",
                                headers: {
                                    "Content-Type": {
                                        type: "string",
                                        description: "Media type of request"
                                    },
                                }
                            }
                        },
                        "x-amazon-apigateway-integration": {
                            responses: {
                                default: {
                                    statusCode: "200",
                                    "responseParameters": {
                                        "method.response.header.Content-Type": "'application/json'"
                                    },
                                    "responseTemplates": {
                                        "application/json": "{status: 200, message: 'OK INVOICE CHECK'}"
                                    },
                                }
                            },
                            "requestTemplates": {
                                "application/json": "{\"statusCode\": 200}"
                            },
                            "passthroughBehavior": "when_no_match",
                            "type": "mock"
                        }
                    }
                },
                "/stripe/webhooks/charges": {
                    "get": {
                        responses: {
                            "200": {
                                description: "successful operation",
                                headers: {
                                    "Content-Type": {
                                        type: "string",
                                        description: "Media type of request"
                                    },
                                }
                            }
                        },
                        "x-amazon-apigateway-integration": {
                            responses: {
                                default: {
                                    statusCode: "200",
                                    "responseParameters": {
                                        "method.response.header.Content-Type": "'application/json'"
                                    },
                                    "responseTemplates": {
                                        "application/json": "{status: 200, message: 'OK WEBHOOK CHARGES CHECK'}"
                                    },
                                }
                            },
                            "requestTemplates": {
                                "application/json": "{\"statusCode\": 200}"
                            },
                            "passthroughBehavior": "when_no_match",
                            "type": "mock"
                        }
                    }
                },
                "/stripe/webhooks/customers": {
                    "get": {
                        responses: {
                            "200": {
                                description: "successful operation",
                                headers: {
                                    "Content-Type": {
                                        type: "string",
                                        description: "Media type of request"
                                    },
                                }
                            }
                        },
                        "x-amazon-apigateway-integration": {
                            responses: {
                                default: {
                                    statusCode: "200",
                                    "responseParameters": {
                                        "method.response.header.Content-Type": "'application/json'"
                                    },
                                    "responseTemplates": {
                                        "application/json": "{status: 200, message: 'OK WEBHOOK CUSTOMERS CHECK'}"
                                    },
                                }
                            },
                            "requestTemplates": {
                                "application/json": "{\"statusCode\": 200}"
                            },
                            "passthroughBehavior": "when_no_match",
                            "type": "mock"
                        }
                    }
                },
                "/stripe/webhooks/invoices": {
                    "get": {
                        "x-amazon-apigateway-integration": {
                            httpMethod: "GET",
                            type: "HTTP_PROXY",
                            uri: "https://www.google.com",
                        }
                    }
                },
            "/stripe/webhooks/subscriptions": {
                get: {
                    responses: {
                        "200": {
                            description: "successful operation",
                            headers: {
                                "Content-Type": {
                                    type: "string",
                                    description: "Media type of request"
                                },
                            }
                        }
                    },
                    "x-amazon-apigateway-integration": {
                        responses: {
                            default: {
                                statusCode: "200",
                                "responseParameters": {
                                    "method.response.header.Content-Type": "'application/json'"
                                },
                                "responseTemplates": {
                                    "application/json": "{status: 200, message: 'OK GET SUBSCRIPTIONS CHECK'}"
                                },
                            }
                        },
                        "requestTemplates": {
                            "application/json": "{\"statusCode\": 200}"
                        },
                        "passthroughBehavior": "when_no_match",
                        "type": "mock"
                    }
                },
                put: {
                    responses: {
                        "200": {
                            description: "successful operation",
                            headers: {
                                "Content-Type": {
                                    type: "string",
                                    description: "Media type of request"
                                },
                            }
                        }
                    },
                    "x-amazon-apigateway-integration": {
                        "produces": [
                            "application/json"
                          ],
                        responses: {
                            default: {
                                statusCode: "200",
                                "responseParameters": {
                                    "method.response.header.Content-Type": "'application/json'"
                                },
                                "responseTemplates": {
                                    "application/json": "{status: 200, message: 'OK PUT SUBSCRIPTIONS CHECK'}"
                                },
                            }
                        },
                        "requestTemplates": {
                            "application/json": "{\"statusCode\": 200}"
                        },
                        "passthroughBehavior": "when_no_match",
                        "type": "mock"
                    }
                },
                post: {
                    "produces": [
                        "application/json"
                      ],
                    responses: {
                        "200": {
                            description: "successful operation",
                            headers: {
                                "Content-Type": {
                                    type: "string",
                                    description: "Media type of request"
                                },
                                "Access-Control-Allow-Origin": {
                                    "type": "string",
                                    "description": "URI that may access the resource"
                                }
                            }
                        }
                    },
                    "x-amazon-apigateway-integration": {
                        responses: {
                            default: {
                                statusCode: "200",
                                "responseParameters": {
                                    "method.response.header.Content-Type": "'application/json'",
                                    "method.response.header.Access-Control-Allow-Origin": "'*'"
                                },
                                "responseTemplates": {
                                    "application/json": "{status: 200, message: 'OK POST SUBSCRIPTIONS CHECK'}"
                                },
                            }
                        },
                        "requestTemplates": {
                            "application/json": "{\"statusCode\": 200}"
                        },
                        "passthroughBehavior": "when_no_match",
                        "type": "mock"
                    }
                },
                delete: {
                    responses: {
                        "200": {
                            description: "successful operation",
                            headers: {
                                "Content-Type": {
                                    type: "string",
                                    description: "Media type of request"
                                },
                                "Access-Control-Allow-Origin": {
                                    "type": "string",
                                    "description": "URI that may access the resource"
                                }
                            }
                        }
                    },
                    "x-amazon-apigateway-integration": {
                        responses: {
                            default: {
                                statusCode: "200",
                                "responseParameters": {
                                    "method.response.header.Content-Type": "'application/json'"
                                },
                                "responseTemplates": {
                                    "application/json": "{status: 200, message: 'OK GET DELETE CHECK'}"
                                },
                            }
                        },
                        "requestTemplates": {
                            "application/json": "{\"statusCode\": 200}"
                        },
                        "passthroughBehavior": "when_no_match",
                        "type": "mock"
                    }
                }
            }
        }
            //     "/": {
            //       "get": {
            //         "tags": [
            //           "pets"
            //         ],
            //         "description": "PetStore HTML web page containing API usage information",
            //         "consumes": [
            //           "application/json"
            //         ],
            //         "produces": [
            //           "text/html"
            //         ],
            //         "responses": {
            //           "200": {
            //             "description": "Successful operation",
            //             "headers": {
            //               "Content-Type": {
            //                 "type": "string",
            //                 "description": "Media type of request"
            //               }
            //             }
            //           }
            //         },
            // "x-amazon-apigateway-integration": {
            //   "responses": {
            //     "default": {
            //       "statusCode": "200",
            //       "responseParameters": {
            //         "method.response.header.Content-Type": "'text/html'"
            //       },
            //       "responseTemplates": {
            //         "text/html": "<html>\n    <head>\n        <style>\n        body {\n            color: #333;\n            font-family: Sans-serif;\n            max-width: 800px;\n            margin: auto;\n        }\n        </style>\n    </head>\n    <body>\n        <h1>Welcome to your Pet Store API</h1>\n        <p>\n            You have successfully deployed your first API. You are seeing this HTML page because the <code>GET</code> method to the root resource of your API returns this content as a Mock integration.\n        </p>\n        <p>\n            The Pet Store API contains the <code>/pets</code> and <code>/pets/{petId}</code> resources. By making a <a href=\"/$context.stage/pets/\" target=\"_blank\"><code>GET</code> request</a> to <code>/pets</code> you can retrieve a list of Pets in your API. If you are looking for a specific pet, for example the pet with ID 1, you can make a <a href=\"/$context.stage/pets/1\" target=\"_blank\"><code>GET</code> request</a> to <code>/pets/1</code>.\n        </p>\n        <p>\n            You can use a REST client such as <a href=\"https://www.getpostman.com/\" target=\"_blank\">Postman</a> to test the <code>POST</code> methods in your API to create a new pet. Use the sample body below to send the <code>POST</code> request:\n        </p>\n        <pre>\n{\n    \"type\" : \"cat\",\n    \"price\" : 123.11\n}\n        </pre>\n    </body>\n</html>"
            //       }
            //     }
            //   },
            //   "passthroughBehavior": "when_no_match",
            //   "requestTemplates": {
            //     "application/json": "{\"statusCode\": 200}"
            //   },
            //   "type": "mock"
            // }
            //       }
            //     },
                // "/pets": {
                //   "get": {
                //     "tags": [
                //       "pets"
                //     ],
                //     "summary": "List all pets",
                //     "produces": [
                //       "application/json"
                //     ],
                //     "parameters": [
                //       {
                //         "name": "type",
                //         "in": "query",
                //         "description": "The type of pet to retrieve",
                //         "required": false,
                //         "type": "string"
                //       },
                //       {
                //         "name": "page",
                //         "in": "query",
                //         "description": "Page number of results to return.",
                //         "required": false,
                //         "type": "string"
                //       }
                //     ],
                //     "responses": {
                //       "200": {
                //         "description": "Successful operation",
                //         "schema": {
                //           "$ref": "#/definitions/Pets"
                //         },
                //         "headers": {
                //           "Access-Control-Allow-Origin": {
                //             "type": "string",
                //             "description": "URI that may access the resource"
                //           }
                //         }
                //       }
                //     },
                //     "x-amazon-apigateway-integration": {
                //       "responses": {
                //         "default": {
                //           "statusCode": "200",
                //           "responseParameters": {
                //             "method.response.header.Access-Control-Allow-Origin": "'*'"
                //           }
                //         }
                //       },
                //       "requestParameters": {
                //         "integration.request.querystring.page": "method.request.querystring.page",
                //         "integration.request.querystring.type": "method.request.querystring.type"
                //       },
                //       "uri": "http://petstore.execute-api.ca-central-1.amazonaws.com/petstore/pets",
                //       "passthroughBehavior": "when_no_match",
                //       "httpMethod": "GET",
                //       "type": "http"
                //     }
                //   },
                //   "post": {
                //     "tags": [
                //       "pets"
                //     ],
                //     "operationId": "CreatePet",
                //     "summary": "Create a pet",
                //     "consumes": [
                //       "application/json"
                //     ],
                //     "produces": [
                //       "application/json"
                //     ],
                //     "parameters": [
                //       {
                //         "in": "body",
                //         "name": "NewPet",
                //         "required": true,
                //         "schema": {
                //           "$ref": "#/definitions/NewPet"
                //         }
                //       }
                //     ],
                //     "responses": {
                //       "200": {
                //         "description": "Successful operation",
                //         "schema": {
                //           "$ref": "#/definitions/NewPetResponse"
                //         },
                //         "headers": {
                //           "Access-Control-Allow-Origin": {
                //             "type": "string",
                //             "description": "URI that may access the resource"
                //           }
                //         }
                //       }
                //     },
                //     "x-amazon-apigateway-integration": {
                //       "responses": {
                //         "default": {
                //           "statusCode": "200",
                //           "responseParameters": {
                //             "method.response.header.Access-Control-Allow-Origin": "'*'"
                //           }
                //         }
                //       },
                //       "uri": "http://petstore.execute-api.ca-central-1.amazonaws.com/petstore/pets",
                //       "passthroughBehavior": "when_no_match",
                //       "httpMethod": "POST",
                //       "type": "http"
                //     }
                //   },
                //   "options": {
                //     "consumes": [
                //       "application/json"
                //     ],
                //     "produces": [
                //       "application/json"
                //     ],
                //     "responses": {
                //       "200": {
                //         "description": "Successful operation",
                //         "schema": {
                //           "$ref": "#/definitions/Empty"
                //         },
                //         "headers": {
                //           "Access-Control-Allow-Origin": {
                //             "type": "string",
                //             "description": "URI that may access the resource"
                //           },
                //           "Access-Control-Allow-Methods": {
                //             "type": "string",
                //             "description": "Method or methods allowed when accessing the resource"
                //           },
                //           "Access-Control-Allow-Headers": {
                //             "type": "string",
                //             "description": "Used in response to a preflight request to indicate which HTTP headers can be used when making the request."
                //           }
                //         }
                //       }
                //     },
                //     "x-amazon-apigateway-integration": {
                //       "responses": {
                //         "default": {
                //           "statusCode": "200",
                //           "responseParameters": {
                //             "method.response.header.Access-Control-Allow-Methods": "'POST,GET,OPTIONS'",
                //             "method.response.header.Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
                //             "method.response.header.Access-Control-Allow-Origin": "'*'"
                //           }
                //         }
                //       },
                //       "passthroughBehavior": "when_no_match",
                //       "requestTemplates": {
                //         "application/json": "{\"statusCode\": 200}"
                //       },
                //       "type": "mock"
                //     }
                //   }
                // },
            //     "/pets/{petId}": {
            //       "get": {
            //         "tags": [
            //           "pets"
            //         ],
            //         "summary": "Info for a specific pet",
            //         "operationId": "GetPet",
            //         "produces": [
            //           "application/json"
            //         ],
            //         "parameters": [
            //           {
            //             "name": "petId",
            //             "in": "path",
            //             "description": "The id of the pet to retrieve",
            //             "required": true,
            //             "type": "string"
            //           }
            //         ],
            //         "responses": {
            //           "200": {
            //             "description": "Successful operation",
            //             "schema": {
            //               "$ref": "#/definitions/Pet"
            //             },
            //             "headers": {
            //               "Access-Control-Allow-Origin": {
            //                 "type": "string",
            //                 "description": "URI that may access the resource"
            //               }
            //             }
            //           }
            //         },
            //         "x-amazon-apigateway-integration": {
            //           "responses": {
            //             "default": {
            //               "statusCode": "200",
            //               "responseParameters": {
            //                 "method.response.header.Access-Control-Allow-Origin": "'*'"
            //               }
            //             }
            //           },
            //           "requestParameters": {
            //             "integration.request.path.petId": "method.request.path.petId"
            //           },
            //           "uri": "http://petstore.execute-api.ca-central-1.amazonaws.com/petstore/pets/{petId}",
            //           "passthroughBehavior": "when_no_match",
            //           "httpMethod": "GET",
            //           "type": "http"
            //         }
            //       },
            //       "options": {
            //         "consumes": [
            //           "application/json"
            //         ],
            //         "produces": [
            //           "application/json"
            //         ],
            //         "parameters": [
            //           {
            //             "name": "petId",
            //             "in": "path",
            //             "description": "The id of the pet to retrieve",
            //             "required": true,
            //             "type": "string"
            //           }
            //         ],
            //         "responses": {
            //           "200": {
            //             "description": "Successful operation",
            //             "schema": {
            //               "$ref": "#/definitions/Empty"
            //             },
            //             "headers": {
            //               "Access-Control-Allow-Origin": {
            //                 "type": "string",
            //                 "description": "URI that may access the resource"
            //               },
            //               "Access-Control-Allow-Methods": {
            //                 "type": "string",
            //                 "description": "Method or methods allowed when accessing the resource"
            //               },
            //               "Access-Control-Allow-Headers": {
            //                 "type": "string",
            //                 "description": "Used in response to a preflight request to indicate which HTTP headers can be used when making the request."
            //               }
            //             }
            //           }
            //         },
            //         "x-amazon-apigateway-integration": {
            //           "responses": {
            //             "default": {
            //               "statusCode": "200",
            //               "responseParameters": {
            //                 "method.response.header.Access-Control-Allow-Methods": "'GET,OPTIONS'",
            //                 "method.response.header.Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
            //                 "method.response.header.Access-Control-Allow-Origin": "'*'"
            //               }
            //             }
            //           },
            //           "passthroughBehavior": "when_no_match",
            //           "requestTemplates": {
            //             "application/json": "{\"statusCode\": 200}"
            //           },
            //           "type": "mock"
            //         }
            //       }
            //     }
            //   },
            //   "definitions": {
            //     "Pets": {
            //       "type": "array",
            //       "items": {
            //         "$ref": "#/definitions/Pet"
            //       }
            //     },
            //     "Empty": {
            //       "type": "object"
            //     },
            //     "NewPetResponse": {
            //       "type": "object",
            //       "properties": {
            //         "pet": {
            //           "$ref": "#/definitions/Pet"
            //         },
            //         "message": {
            //           "type": "string"
            //         }
            //       }
            //     },
            //     "Pet": {
            //       "type": "object",
            //       "properties": {
            //         "id": {
            //           "type": "integer"
            //         },
            //         "type": {
            //           "type": "string"
            //         },
            //         "price": {
            //           "type": "number"
            //         }
            //       }
            //     },
            //     "NewPet": {
            //       "type": "object",
            //       "properties": {
            //         "type": {
            //           "$ref": "#/definitions/PetType"
            //         },
            //         "price": {
            //           "type": "number"
            //         }
            //       }
            //     },
            //     "PetType": {
            //       "type": "string",
            //       "enum": [
            //         "dog",
            //         "cat",
            //         "fish",
            //         "bird",
            //         "gecko"
            //       ]
            //     }
            //   },
            //   "x-amazon-apigateway-documentation": {
            //     "version": "v2.1",
            //     "createdDate": "2016-11-17T07:03:59Z",
            //     "documentationParts": [
            //       {
            //         "location": {
            //           "type": "API"
            //         },
            //         "properties": {
            //           "info": {
            //             "description": "Your first API with Amazon API Gateway. This is a sample API that integrates via HTTP with our demo Pet Store endpoints"
            //           }
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "METHOD",
            //           "method": "GET"
            //         },
            //         "properties": {
            //           "tags": [
            //             "pets"
            //           ],
            //           "description": "PetStore HTML web page containing API usage information"
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "METHOD",
            //           "path": "/pets/{petId}",
            //           "method": "GET"
            //         },
            //         "properties": {
            //           "tags": [
            //             "pets"
            //           ],
            //           "summary": "Info for a specific pet"
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "METHOD",
            //           "path": "/pets",
            //           "method": "GET"
            //         },
            //         "properties": {
            //           "tags": [
            //             "pets"
            //           ],
            //           "summary": "List all pets"
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "METHOD",
            //           "path": "/pets",
            //           "method": "POST"
            //         },
            //         "properties": {
            //           "tags": [
            //             "pets"
            //           ],
            //           "summary": "Create a pet"
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "PATH_PARAMETER",
            //           "path": "/pets/{petId}",
            //           "method": "*",
            //           "name": "petId"
            //         },
            //         "properties": {
            //           "description": "The id of the pet to retrieve"
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "QUERY_PARAMETER",
            //           "path": "/pets",
            //           "method": "GET",
            //           "name": "page"
            //         },
            //         "properties": {
            //           "description": "Page number of results to return."
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "QUERY_PARAMETER",
            //           "path": "/pets",
            //           "method": "GET",
            //           "name": "type"
            //         },
            //         "properties": {
            //           "description": "The type of pet to retrieve"
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "REQUEST_BODY",
            //           "path": "/pets",
            //           "method": "POST"
            //         },
            //         "properties": {
            //           "description": "Pet object that needs to be added to the store"
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "RESPONSE",
            //           "method": "*",
            //           "statusCode": "200"
            //         },
            //         "properties": {
            //           "description": "Successful operation"
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "RESPONSE_HEADER",
            //           "method": "OPTIONS",
            //           "statusCode": "200",
            //           "name": "Access-Control-Allow-Headers"
            //         },
            //         "properties": {
            //           "description": "Used in response to a preflight request to indicate which HTTP headers can be used when making the request."
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "RESPONSE_HEADER",
            //           "method": "OPTIONS",
            //           "statusCode": "200",
            //           "name": "Access-Control-Allow-Methods"
            //         },
            //         "properties": {
            //           "description": "Method or methods allowed when accessing the resource"
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "RESPONSE_HEADER",
            //           "method": "*",
            //           "statusCode": "200",
            //           "name": "Access-Control-Allow-Origin"
            //         },
            //         "properties": {
            //           "description": "URI that may access the resource"
            //         }
            //       },
            //       {
            //         "location": {
            //           "type": "RESPONSE_HEADER",
            //           "method": "GET",
            //           "statusCode": "200",
            //           "name": "Content-Type"
            //         },
            //         "properties": {
            //           "description": "Media type of request"
            //         }
            //       }
            //     ]
            //   }
            
        }),
        endpointConfiguration: { types: "REGIONAL" },
    });

    // let sample = new awsx.apigateway.API("exampleexampleDeployment2", {
    //     routes: [{
    //         path: "/",
    //         method: "GET",
    //         eventHandler: someFunction = async (event) => {
    //             // This code runs in an AWS Lambda and will be invoked any time `/` is hit.
    //             return {
    //                 statusCode: 200,
    //                 body: "hello",
    //             };
    //         },
    //     }],
    // })

    const exampleDeployment = new aws.apigateway.Deployment("exampleDeployment", {
        restApi: sample.id,
        triggers: {
            redeployment: sample.body.apply(body => JSON.stringify(body)).apply(toJSON => crypto.createHash('sha1').update(toJSON).digest('hex')),
        },
    });

    const exampleStage = new aws.apigateway.Stage(`${env_name}`, {
        deployment: exampleDeployment.id,
        restApi: sample.id,
        stageName: `${env_name}`,
    });
}
