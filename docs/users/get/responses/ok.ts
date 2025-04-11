import { responseSchema } from '../response-schema'

export const ok = {
    "200": {
        "description": "Lista de usuários",
        "content": {
            "application/json": {
                ...responseSchema
            }
        }
    }
}