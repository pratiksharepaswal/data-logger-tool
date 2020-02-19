const config = {
    MongoURI: 'mongodb://localhost:27017/test',
    db: {
        user: "root",
        host: "localhost",
        port: 27017,
        pass: "root",
        name: "test",
        
    }
}

config.db.uri = ""

module.exports = config