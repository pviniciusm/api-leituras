import { NextFunction, Request, Response } from "express";
import { RequestError } from "../error/request.error";
import { ServerError } from "../error/server.error";

export class LoginValidatorMiddleware {
  public static loginValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userNome, senha } = req.body;
      if (!userNome) {
        return RequestError.fieldNotProvided(res, "UserName");
      }
      if (!senha) {
        return RequestError.fieldNotProvided(res, "Senha");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
