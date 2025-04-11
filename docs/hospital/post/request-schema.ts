
export const requestSchema = {
    "schema": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "example": "Hospital Central"
                },
                "Logradouro": {
                    "type": "string",
                    "example": "Rua das Flores, 123"
                },
                "convenios": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string",
                                "format": "uuid",
                                "example": "123e4567-e89b-12d3-a456-426655440000"
                            },
                            "name": {
                                "type": "string",
                                "example": "UNIMED - UNIFACIL"
                            },

                        },
                        "example": [
                            {
                                "id": "123e4567-e89b-12d3-a456-426655440000",
                                "name": "UNIMED - UNIFACIL"
                            },
                            {
                                "id": "123e4567-e89b-12d3-a456-426655440000",
                                "name": "UNIMED - UNIFACIL"
                            }
                        ]
                    }
                }
            },


        }
    }

}

