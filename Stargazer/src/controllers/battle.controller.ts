import { Request, Response } from "express";
import BattleService from "../services/battle.service";

const battle = async (req: Request, res: Response) => {
  const users = await BattleService.getGitHubInfo(req.body);
  const results = BattleService.battle(users);
  res.status(200).send(results);
};

export default {
  battle,
};
