import { Router } from "express";
import {
     createStory,
     deleteStory,
     getAllStory,
     getStoryById,
     updateStory,
} from "../controllers/story.controller.js";
import { autenticate } from "../controllers/error.controller.js";

const storyRouter = Router();

storyRouter.get("/story", getAllStory);
storyRouter.get("/story/:id", getStoryById);
storyRouter.post("/story", createStory);
storyRouter.put("/story/:id", updateStory);
storyRouter.delete("/story/:id", deleteStory);

export default storyRouter;
