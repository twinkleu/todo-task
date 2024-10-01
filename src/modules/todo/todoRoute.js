import { Router } from "express";
const router = Router({ caseSensitive: true });
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
  getOverDueTodos,
} from "./todoController";
import checkAuth from "../../middlewares/checkAuth";

router.post("/create", checkAuth, createTodo);

router.put("/update/:id", checkAuth, updateTodo);

router.delete("/delete/:id", checkAuth, deleteTodo);

router.get("/getTasks", checkAuth, getTodos);

router.get("/getTasks/overdue", checkAuth, getOverDueTodos);

export default router;
