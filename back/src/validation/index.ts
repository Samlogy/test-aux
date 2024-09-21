import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email({ message: 'Provide a valid Email' }),
    password: z
        .string()
        .min(4, { message: 'Password must be at least 12 characters long' }),
})

const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);
const StatusEnum = z.enum(["AVAILABLE", "ADOPTED", "PENDING"]);

const postCatSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"), 
  race: z.string().min(1, "Race is required"), 
  sex: GenderEnum, 
  age: z.number().int().nonnegative().max(30, "Age cannot be more than 30"), 
  town: z.string().min(1, "Town is required"), 
  picture: z.string().url("Picture must be a valid URL"), 
  status: StatusEnum, 
  popularity: z.number().int().nonnegative().default(0)
});

export default {
    loginSchema,
    postCatSchema
}
