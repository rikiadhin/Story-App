import joi from "joi";

export const inputStoryValidation = (payload) => {
     const schema = joi.object({
          title: joi.string().trim().required(),
          writes: joi.string().required(),
          category: joi.string().required(),
          tags: joi.string().required(),
          status: joi.string().required(),
          coverImage: joi.string().required(), 
          synopsis: joi.string().required(), 
     });
     return schema.validate(payload);
};
