import axios, { AxiosError } from "axios";
import { z } from "zod";
import {
  HttpException,
  NotFoundException,
} from "../global/exceptions/exceptions";
import { FighterSchema } from "../schemas/fighters.schema";

const fetchUser = async (username: string) => {
  const { data } = await axios(
    `https://api.github.com/users/${username}/repos`
  );
  return data;
};

const getGitHubInfo = async (fighters: z.infer<typeof FighterSchema>) => {
  try {
    const firstUserData = await fetchUser(fighters.firstUser);
    const secondUserData = await fetchUser(fighters.secondUser);
    return {
      firstUserData,
      secondUserData,
    };
  } catch (err: AxiosError | any) {
    if (err.response?.status)
      throw new HttpException(err.response.status, err.response.statusText);
    throw new NotFoundException();
  }
};

const countUserStars = (user: any) => {
  return {
    ...user,
    starCount: user.reduce((_data: any, repo: any, sum: number) => {
      return repo.stargazers_count + sum;
    }, 0),
  };
};

const battle = (users: any) => {
  const firstUserData = countUserStars(users.firstUserData);
  const secondUserData = countUserStars(users.firstUserData);

  if (firstUserData.starCount === secondUserData.starCount) {
    return {
      winner: null,
      loser: null,
      draw: true,
    };
  }

  if (firstUserData.starCount > secondUserData.starCount) {
    return {
      winner: firstUserData[0].owner.login,
      loser: secondUserData[0].owner.login,
      draw: false,
    };
  } else {
    return {
      winner: secondUserData[0].owner.login,
      loser: firstUserData[0].owner.login,
      draw: false,
    };
  }
};

export default {
  getGitHubInfo,
  battle,
};
