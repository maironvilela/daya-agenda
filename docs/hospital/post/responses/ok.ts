import { responseSchema } from '../response-schema'
export const ok = {
    "200": {
        "description": "Hospital cadastrado com sucesso",
        "content": {
            "application/json": {
                ...responseSchema
            }
        }
    }
}