import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Include at least one uppercase letter')
  .regex(/[0-9]/, 'Include at least one number');

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(60),
  email: z.string().trim().email('Enter a valid email address'),
  password: passwordSchema,
});

export const createClassSchema = z.object({
  className: z.string().trim().min(2, 'Class name must be at least 2 characters').max(100),
  description: z.string().trim().max(500).optional().or(z.literal('')),
});

export const joinClassSchema = z.object({
  classCode: z
    .string()
    .trim()
    .length(6, 'Join code must be 6 characters')
    .transform((v) => v.toUpperCase()),
});

export const createPollSchema = z.object({
  question: z.string().trim().min(3, 'Question must be at least 3 characters').max(300),
  options: z
    .array(z.string().trim().min(1, 'Option cannot be empty').max(200))
    .min(2, 'Add at least 2 options'),
  allowResult: z.boolean().default(true),
});

export const askQuestionSchema = z.object({
  question: z.string().trim().min(3, 'Question must be at least 3 characters').max(1000),
});

export const studentProfileSchema = z.object({
  rollNumber: z.string().trim().min(1, 'Roll number is required').max(30),
  department: z.string().trim().min(1, 'Department is required').max(100),
  year: z.string().trim().min(1, 'Year is required').max(20),
  section: z.string().trim().min(1, 'Section is required').max(20),
  collegeName: z.string().trim().min(1, 'College name is required').max(150),
});
