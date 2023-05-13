import { schemas } from './swagger-schemas/index'
import { paths } from './swagger-paths/index'

export const swaggerDocs = {
  openapi: '3.0.3',
  info: {
    title: 'Swagger - OpenAPI 3.0',
    version: '1.0.1',
  },
  servers: [
    {
      url: 'https://lambda-27-photodrop-part-two.onrender.com',
    },
  ],
  tags: [
    {
      name: 'Auth',
    },
    {
      name: 'User',
    },
    {
      name: 'Albums and photos',
    },
    {
      name: 'Payment',
    },
  ],
  paths,
  components: {
    schemas,
  },
}
