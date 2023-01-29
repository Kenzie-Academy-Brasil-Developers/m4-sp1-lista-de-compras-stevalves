interface iProduct {
  name: string;
  quantity: string;
}

interface iCreatePurchaseList {
  listName: number;
  data: iProduct[];
}

interface iCreatePurchaseReturn extends iCreatePurchaseList {
  id: number;
}

export { iProduct, iCreatePurchaseList, iCreatePurchaseReturn };
