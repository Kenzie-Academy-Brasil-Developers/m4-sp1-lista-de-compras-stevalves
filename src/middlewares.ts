import { NextFunction, Request, Response } from "express";
import { data } from "./database";

const verifyListMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const list = data.find((element) => element.id === Number(request.params.id));
  if (!list) {
    return response.status(404).json({
      message: "list not found",
    });
  }

  request.dataResult = {
    dataList: list,
  };

  return next();
};

const verifyListItemMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const list = data.find((element) => element.id === Number(request.params.id));
  if (!list) {
    return response.status(404).json({
      message: "list not found",
    });
  }
  const item = list.data.find(
    (element) => element.name === request.params.name
  );
  if (!item) {
    return response.status(404).json({
      message: "product not found",
    });
  }
  request.dataResult = {
    dataList: list,
    dataListItem: item,
  };

  return next();
};

export { verifyListItemMiddleware, verifyListMiddleware };
