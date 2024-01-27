import express from "express";
import cors from "cors";
import connect from "./models/index.js";
import api from "./routes/index.js";

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", api);
connect();

app.use((_, res) => res.status(404).json({ ok: false, message: "Not Found" })); // 404 error

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
