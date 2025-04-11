import env from './config/env';
import { setupApp } from './config/app';

const app = setupApp();

app.listen(env.port, () => {
    console.log(`Server running at http://localhost:${env.port}`);
    console.log(`📄 Swagger em http://localhost:${env.port}/api-docs`);

}
);

