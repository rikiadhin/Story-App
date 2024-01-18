import { Router } from "express";
import { errorHandling, notFound } from "../controllers/error.controller.js";
import storyRouter from "./story.route.js";
import userRouter from "./user.router.js";
import chapterRouter from "./chapter.route.js";

const app = Router();

app.use("/api", storyRouter);
app.use("/api", userRouter);
app.use("/api", chapterRouter);

app.use("*", errorHandling);
app.use("*", notFound);

export default app;
