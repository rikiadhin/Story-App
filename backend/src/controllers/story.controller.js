import prisma from "../utils/client.js";
import { inputStoryValidation } from "../validations/story.validation.js";

export const getAllStory = async (req, res, next) => {
     try {
          const data = await prisma.story.findMany();
          if (!data) {
               return res.status(404).json({
                    error: "data not found",
                    message: "field",
                    data: null,
               });
          }
          res.status(200).json({
               error: null,
               message: "success",
               data,
          });
     } catch (error) {
          next(
               new Error(
                    "Error in src/controllers/story.controller.js:getAllStory - " +
                    error.message
               )
          );
     }
};

export const getStoryById = async (req, res, next) => {
     try {
          const { id } = req.params;
          const data = await prisma.story.findUnique({
               where: {
                    id: Number(id),
               },
          });
          if (!data) {
               return res.status(404).json({
                    error: "data not found",
                    message: "field",
                    data: null,
               });
          }
          res.status(200).json({
               error: null,
               message: "success",
               data,
          });
     } catch (error) {
          next(
               new Error(
                    "Error in src/controllers/story.controller.js:getStoryById - " +
                    error.message
               )
          );
     }
};

export const createStory = async (req, res, next) => {
     try {
          const { error, value } = inputStoryValidation(req.body);
          console.log(error);
          if (error) {
               return res.status(400).json({
                    error: error.details[0].message,
                    message: "field",
                    data: null,
               });
          }
          const data = await prisma.story.create({
               data: {
                    ...value,
               },
          });
          return res.status(201).json({
               error: null,
               message: "success",
               data,
          });
     } catch (error) {
          next(
               new Error(
                    "Error in src/controllers/story.controller.js:createStory - " +
                    error.message
               )
          );
     }
};

export const updateStory = async (req, res, next) => {
     try {
          const { id } = req.params;
          const { error, value } = inputStoryValidation(req.body);
          if (error) {
               return res.status(400).json({
                    error: error.details[0].message,
                    message: "field",
                    data: null,
               });
          }
          const data = await prisma.story.update({
               where: {
                    id: Number(id),
               },
               data: {
                    ...value,
               },
          });
          res.status(200).json({
               error: null,
               message: "success",
               data,
          });
     } catch (error) {
          next(
               new Error(
                    "Error in src/controllers/story.controller.js:updateStory - " +
                    error.message
               )
          );
     }
};

export const deleteStory = async (req, res, next) => {
     try {
          const { id } = req.params;
          const data = await prisma.story.delete({
               where: {
                    id: Number(id),
               },
          });
          res.status(200).json({
               error: null,
               message: "success",
               data,
          });
     } catch (error) {
          next(
               new Error(
                    "Error in src/controllers/story.controller.js:deleteStory - " +
                    error.message
               )
          );
     }
};
