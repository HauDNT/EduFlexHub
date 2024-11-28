export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    
    // Database:
    dbPort: parseInt(process.env.DB_PORT),
    dbHost: process.env.DB_HOST,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    secret_key: process.env.SECRET_KEY,

});
