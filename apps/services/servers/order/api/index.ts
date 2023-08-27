import { Router } from "express";
import orders from "./routes/orders";

export default () => {
  const router = Router();
  orders(router);
  return router;
}