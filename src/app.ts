import express, { Application, json } from "express";
import {
  createList,
  viewList,
  viewListById,
  deleteList,
  deleteItem,
  editItem,
} from "./logic";
import { verifyListItemMiddleware, verifyListMiddleware } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/purchaseList", createList);
app.get("/purchaseList", viewList);
app.get("/purchaseList/:id", verifyListMiddleware, viewListById);
app.delete("/purchaseList/:id", verifyListMiddleware, deleteList);
app.delete("/purchaseList/:id/:name", verifyListItemMiddleware, deleteItem);
app.patch("/purchaseList/:id/:name", verifyListItemMiddleware, editItem);

const PORT: number = 3000;
const runningMsg: string = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
