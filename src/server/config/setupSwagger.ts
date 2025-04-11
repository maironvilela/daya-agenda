// No seu arquivo principal
import swaggerUi from 'swagger-ui-express';
import express, { Express } from 'express';

import { swaggerDocument } from '../../../docs/swagger';

export function setupSwagger(app: Express) {
    try {
        app.use(express.static('node_modules/swagger-ui-dist', { index: false }));
        app.use('/swagger-ui', express.static('node_modules/swagger-ui-dist'));
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } catch (error) {
        console.error('Erro ao configurar Swagger:', error);
    }
}
