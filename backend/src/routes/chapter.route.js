import { Router } from "express";
import {
  createChapter,
  deleteChapter,
  getAllChapter,
  getChapterById,
  updateChapter,
} from "../controllers/chapter.controller.js";
import { autenticate } from "../controllers/error.controller.js";

const chapterRouter = Router(); 
chapterRouter.get("/chapters", getAllChapter);
chapterRouter.get("/chapters/:id", getChapterById);
chapterRouter.post("/chapters", createChapter);
chapterRouter.put("/chapters/:id", updateChapter);
chapterRouter.delete("/chapters/:id", deleteChapter);

export default chapterRouter;
