import config from "../../../config";
import ApiError from "../../errors/ApiError";
import { UserStatus } from "../../generated/prisma/enums";
import { jwtHelper } from "../../helper/jwtHelper";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST,"Password Is InCorrect!!!");
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.token.secret,config.token.expireIn
  );
  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.token.secret,config.token.expireIn
  );


  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPassWordChange
  }
};

export const AuthService = {
  login,
};
