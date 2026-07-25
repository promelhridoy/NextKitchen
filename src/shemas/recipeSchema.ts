import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  quantity: z.string().min(1, "Quantity is required"),
});

export const stepSchema = z.object({
  instruction: z.string().min(5, "Step must be at least 5 characters"),
});

export const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000),
  category: z.string().min(1, "Please select a category"),
  cuisine: z.string().min(1, "Please select a cuisine"),
  difficulty: z.enum(["Easy", "Medium", "Hard"], { message: "Please select a difficulty" }),
  prepTime: z.coerce.number().min(1, "Prep time is required"),
  cookTime: z.coerce.number().min(1, "Cook time is required"),
  servings: z.coerce.number().min(1, "Servings must be at least 1"),
  ingredients: z.array(ingredientSchema).min(1, "Add at least one ingredient"),
  steps: z.array(stepSchema).min(1, "Add at least one step"),
  tags: z.string().optional(),
  videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;