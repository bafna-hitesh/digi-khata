import { Router } from "express";
import dashboard from "./routes/dashboard";

export default () => {
  const router = Router();
  dashboard(router);
  return router;
}