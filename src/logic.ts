import { Request, Response } from "express";
import { data } from "./database";
import {
  iCreatePurchaseList,
  iCreatePurchaseReturn,
  iProduct,
} from "./interfaces";

const validateNewList = (payload: any) => {
  const keys: string[] = Object.keys(payload);
  const requiredKeys: string[] = ["listName", "data"];

  const requerimentsIsOk: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  const filter: boolean = keys.every((key: string) => {
    return requiredKeys.includes(key);
  });

  if (!requerimentsIsOk || !filter) {
    throw new Error(`Required keys are ( ${requiredKeys} )`);
  }

  return payload;
};

const validateKeysProduct = (payload: any) => {
  const keys: string[] = Object.keys(payload);
  const requiredKeys: string[] = ["name", "quantity"];

  const filter: boolean = keys.every((key: string) => {
    return requiredKeys.includes(key);
  });

  if (!filter) {
    throw new Error(`Only acceptable keys are ( ${requiredKeys} )`);
  }

  return payload;
};

const createList = (request: Request, response: Response): Response => {
  try {
    const requestData: iCreatePurchaseList = validateNewList(request.body);

    let floatId: number = 1
    const requestResponse: iCreatePurchaseReturn = {
      id: floatId,
      ...requestData,
    };
    
    let ids = data.map(item => item.id+1)
    for(let i = 0; i < data.length; i++){
      if(data[i].id === requestResponse.id || ids.includes(requestResponse.id+1)){
        floatId++
        requestResponse.id = floatId
      }
    }

    data.push(requestResponse);
    return response.status(201).json(requestResponse);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    return response.status(500).json({
      message: "internal server error",
    });
  }
};

const viewList = (request: Request, response: Response): Response => {
  return response.status(200).json(data);
};

const viewListById = (request: Request, response: Response): Response => {
  const { dataList } = request.dataResult;

  return response.status(200).json(dataList);
};

const deleteList = (request: Request, response: Response): Response => {
  const { dataList } = request.dataResult;

  const listIndex: number = data.indexOf(dataList!);
  data.splice(listIndex, 1);

  return response.status(204).send();
};

const deleteItem = (request: Request, response: Response): Response => {
  const { dataList, dataListItem } = request.dataResult;

  const listIndex: number = dataList!.data.indexOf(dataListItem!);
  dataList!.data.splice(listIndex, 1);

  return response.status(204).send();
};

const editItem = (request: Request, response: Response): Response => {
  try {
    const { dataList, dataListItem } = request.dataResult;
    const requestData: iProduct = validateKeysProduct(request.body);

    const listIndex: number = dataList!.data.indexOf(dataListItem!);
    dataList.data[listIndex] = { ...dataList.data[listIndex], ...requestData };

    return response.status(200).json(dataList);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    return response.status(500).json({
      message: "internal server error",
    });
  }
};

export { createList, viewList, viewListById, deleteList, deleteItem, editItem };
