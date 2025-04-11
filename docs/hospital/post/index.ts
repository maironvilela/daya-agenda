import { requestSchema } from './request-schema'
import { ok } from './responses/ok'

export const hospitalPost = {
    "post": {
        "summary": "Cadastra um hospital",
        "operationId": "createHospital",
        "tags": ["hospital"],
        "requestBody": {
            "content": {
                "application/json": {
                    ...requestSchema

                }
            }
        },
        "responses": {
            ...ok

        }
    }
}