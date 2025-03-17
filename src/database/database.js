import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/mediapp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

db.once(
    'open', function () {
        console.log('Conexão com banco de dados realizada com sucesso!');
    }
);

export default db;