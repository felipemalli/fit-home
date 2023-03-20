export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/fit-home-api',
  port: process.env.PORT ?? 5050
}
