import "express-async-errors";
import express, { json } from "express";

import errorHandler from "./global/middleware/errorHandler";
import cors from "cors";
import validateSchema from "./global/middleware/zod-validation";
import { FighterSchema } from "./schemas/fighters.schema";
import BattleController from "./controllers/battle.controller";

const app = express();
app.use(json());
app.use(cors());

app.post("/battle", validateSchema(FighterSchema), BattleController.battle);
app.get("/ranking");
app.use(errorHandler);

export default app;
