export const responseSchema = {
    "schema": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "example": 1
                },
                "name": {
                    "type": "string",
                    "example": "João Silva"
                },
                "email": {
                    "type": "string",
                    "example": "joao@email.com"
                }
            }

        }
    }
}