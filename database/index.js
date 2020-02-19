const mongoose = require("./mongoose");
const config = require("../config/keys");

let rawConnection;

class Database {
  constructor() {
    this.connection = null;
  }
  getConnection() {
    return this.connection;
  }
  setConnection(c) {
    this.connection = c;
  }
  connect(reset = false) {
    return new Promise((resolve, reject) => {
      let db;
      mongoose.Promise = global.Promise;
      db = mongoose.connect(config.MongoURI, config.db.options, function(err) {
        if (err) {
          console.error(this, err);
        }
        mongoose.set("debug", false);
        reject(false, err);
      });
      mongoose.connection.on("error", err => {
        if (err.message.code === "ETIMEDOUT") {
          console.log("MongoDB Instance timed out.\n", err);
          setTimeout(() => {
            mongoose.createConnection(config.db.uri, config.db.options);
          }, 1000);
        }
        console.log("Couldn't connect to MongoDB.\n", err);
        reject(false, err);
      });
      mongoose.connection.on("open", () => {
        db = mongoose.connection;
        rawConnection = mongoose.connection;
        if (reset && mongoose.connection.db) {
          mongoose.connection.db.dropDatabase();
        }
        this.setConnection(rawConnection);
        console.log("Connection to MongoDB successful.");
        resolve(rawConnection, null);
      });
    });
  }
}

let db = new Database();
module.exports = {
  mongoose,
  Database,
  db
};