import joi from "joi";

export const inputChapterValidation = (payload) => {
  const schema = joi.object({
    title: joi.string().trim().required(),
    story: joi.string().required(), 
  });
  return schema.validate(payload);
};
