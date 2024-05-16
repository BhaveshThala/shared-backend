const localConfig = {
    databasename: process.env.dbName || "",
    username: process.env.username || "",
    password: process.env.password || "#2022",
    host: process.env.host || "",
    dbtype: process.env.dbType || ""
}
module.exports = { databaseConfig: localConfig }