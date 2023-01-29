import * as express from "express";
import { iCreatePurchaseReturn, iProduct } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      dataResult: {
        dataList: iCreatePurchaseReturn;
        dataListItem?: iProduct;
      };
    }
  }
}
