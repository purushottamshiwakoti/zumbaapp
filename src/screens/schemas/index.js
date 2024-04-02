import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export const registerSchema = z.object({
  fullName: z.string().min(1, "Fullname is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
});

export const vehicleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  number: z.string().min(1, "Vehicle Number is required"),
});
