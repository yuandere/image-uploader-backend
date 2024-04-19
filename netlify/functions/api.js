import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";

const api = express();
const router = Router();

api.use(cors());

router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

export const handler = serverless(api);
