import { z } from 'zod';


export const UserSchemaValidation = z.object({
    email: z.string({ required_error: "Email is required.", invalid_type_error: "Please enter a valid email." }).email("Please enter a valid email."),
    password: z.string({ required_error: "Password is required.", invalid_type_error: "Please enter a valid password" }).min(8, "Password must be 8 or more characters long").max(20, "Password cannot be more than 20 characters long"),
    displayName: z.string({ required_error: "Display Name is required.", invalid_type_error: "Please enter a valid Display Name" }).min(3, "Display name must be more than 2 characters long")
})
