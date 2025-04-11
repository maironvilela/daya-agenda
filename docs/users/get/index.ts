import { ok } from './responses/ok'

export const userGet = {
    "get": {
        "summary": "Lista de usuários",
        "operationId": "listUsers",
        "tags": ["users"],
        "responses": {
            ...ok
        }
    }
}