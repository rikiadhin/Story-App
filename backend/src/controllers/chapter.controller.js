import prisma from "../utils/client.js";
import { inputChapterValidation } from "../validations/chapter.validation.js";

export const getAllChapter = async (req, res, next) => {
  try {
    const data = await prisma.chapter.findMany();
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
        "Error in src/controllers/chapter.controller.js:getAllChapter - " +
        error.message
      )
    );
  }
};

export const getChapterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await prisma.chapter.findUnique({
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
        "Error in src/controllers/chapter.controller.js:getChapterById - " +
        error.message
      )
    );
  }
};

export const createChapter = async (req, res, next) => {
  try {
    const { error, value } = inputChapterValidation(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
        message: "field",
        data: null,
      });
    }
    const data = await prisma.chapter.create({
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
        "Error in src/controllers/chapter.controller.js:createChapter - " +
        error.message
      )
    );
  }
};

export const updateChapter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = inputChapterValidation(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
        message: "field",
        data: null,
      });
    }
    const data = await prisma.chapter.update({
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
        "Error in src/controllers/chapter.controller.js:updateChapter - " +
        error.message
      )
    );
  }
};

export const deleteChapter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await prisma.chapter.delete({
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
        "Error in src/controllers/chapter.controller.js:deleteChapter - " +
        error.message
      )
    );
  }
};
