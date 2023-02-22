import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send({
        message: "Ok",
    });
});

app.listen(process.env.PORT, () => {
    console.log("API está rodando");
});
