import { users } from './users'
import { hospital } from './hospital'
export const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "Daya Agenda",
    "version": "1.0.0",
    "description": "Documentação da API para gerenciamento de agendamentos de consultas e cirurgias"
  },
  "servers": [
    {
      "url": "http://localhost:3001",
      "description": "Servidor de Desenvolvimento"
    }
  ],
  "paths": {
    ...hospital

  },

  "x-swagger-ui": {
    "defaultModelsExpandDepth": -1
  }
}
