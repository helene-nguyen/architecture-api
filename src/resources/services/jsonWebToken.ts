//~ Import modules
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

//~  Jwt Access_Token
const generateAccessToken = (user: Object) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1d' }); // 1d => one day, 60m => 60 minutes
}

const generateRefreshToken = (user: Object, req: Request) => {
  //* -- register refresh tokens
  req.session.refreshToken = [];
  const token = req.session.refreshToken;

  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '2d' }); // 1d => one day, 60m => 60 minutes

  token.push(refreshToken);

  return refreshToken;
}

//~  Jwt Refresh_Token
const refreshToken = (req: Request, res: Response) => {
  if (req.session.refreshToken?.length === 0) {
    const user = req.user;

    //delete old token and replace with new token
    const accessToken = generateAccessToken({ user });
    const refreshToken = generateRefreshToken({ user }, req);

    //generate a new accessToken and refreshToken
    return res.status(200).json({ accessToken, refreshToken });
  }
}

export { generateAccessToken, generateRefreshToken, refreshToken };
