"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Plus, X, ImagePlus, Loader2, GripVertical } from "lucide-react";
import { RecipeFormValues, recipeSchema } from "@/shemas/recipeSchema";
import { CATEGORIES, CUISINES, DIFFICULTIES } from "@/data/recipeFormOptions";


export default function RecipeForm() {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [gallery, setGallery] = useState<{ file: File; preview: string }[]>([]);
  const [submitting, setSubmitting] = useState<"draft" | "publish" | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [{ name: "", quantity: "" }],
      steps: [{ instruction: "" }],
    },
  });

  const ingredientsArray = useFieldArray({ control, name: "ingredients" });
  const stepsArray = useFieldArray({ control, name: "steps" });

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 8 - gallery.length);
    const mapped = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setGallery((prev) => [...prev, ...mapped]);
  };

  const removeGalleryImage = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: RecipeFormValues, status: "draft" | "publish") => {
    if (!coverImage && status === "publish") {
      toast.error("A cover image is required to publish");
      return;
    }

    setSubmitting(status);
    try {
      // TODO(wire-up): build FormData and POST to your backend, e.g.
      // const formData = new FormData();
      // formData.append("title", values.title);
      // formData.append("ingredients", JSON.stringify(values.ingredients));
      // formData.append("steps", JSON.stringify(values.steps.map((s, i) => ({ order: i + 1, instruction: s.instruction }))));
      // formData.append("status", status);
      // if (coverImage) formData.append("coverImage", coverImage);
      // gallery.forEach((g) => formData.append("gallery", g.file));
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes`, { method: "POST", body: formData, credentials: "include" });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(status === "draft" ? "Saved as draft" : "Recipe published!");
      router.push("/dashboard/my-recipes");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <form className="space-y-8">
      {/* Basic info */}
      <Section title="Basic Information">
        <FormField label="Recipe Title" error={errors.title?.message}>
          <input
            {...register("title")}
            placeholder="e.g. Slow-Braised Beef Bhuna with Caramelized Onions"
            className={inputClass}
          />
        </FormField>

        <FormField label="Description" error={errors.description?.message}>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="A short, appetizing description of your dish..."
            className={`${inputClass} resize-none`}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="Category" error={errors.category?.message}>
            <select {...register("category")} className={inputClass} defaultValue="">
              <option value="" disabled>Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>

          <FormField label="Cuisine" error={errors.cuisine?.message}>
            <select {...register("cuisine")} className={inputClass} defaultValue="">
              <option value="" disabled>Select cuisine</option>
              {CUISINES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>

          <FormField label="Difficulty" error={errors.difficulty?.message}>
            <select {...register("difficulty")} className={inputClass} defaultValue="">
              <option value="" disabled>Select difficulty</option>
              {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="Prep Time (min)" error={errors.prepTime?.message}>
            <input type="number" {...register("prepTime")} placeholder="15" className={inputClass} />
          </FormField>
          <FormField label="Cook Time (min)" error={errors.cookTime?.message}>
            <input type="number" {...register("cookTime")} placeholder="30" className={inputClass} />
          </FormField>
          <FormField label="Servings" error={errors.servings?.message}>
            <input type="number" {...register("servings")} placeholder="4" className={inputClass} />
          </FormField>
        </div>
      </Section>

      {/* Ingredients */}
      <Section title="Ingredients" subtitle="Add every ingredient with its quantity">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {ingredientsArray.fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-2"
              >
                <GripVertical size={16} className="mt-3 shrink-0 text-gray-300" />
                <input
                  {...register(`ingredients.${index}.name`)}
                  placeholder="Ingredient name (e.g. Garlic cloves)"
                  className={`${inputClass} flex-[2]`}
                />
                <input
                  {...register(`ingredients.${index}.quantity`)}
                  placeholder="Quantity (e.g. 3 cloves)"
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => ingredientsArray.remove(index)}
                  disabled={ingredientsArray.fields.length === 1}
                  className="mt-1 shrink-0 rounded-2xl p-2.5 text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30 dark:hover:bg-red-900/20"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {errors.ingredients?.message && <p className="text-xs text-red-500">{errors.ingredients.message}</p>}

          <button
            type="button"
            onClick={() => ingredientsArray.append({ name: "", quantity: "" })}
            className="flex items-center gap-1.5 rounded-2xl border border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:border-orange-500 hover:text-orange-500 dark:border-gray-700 dark:text-gray-400"
          >
            <Plus size={15} /> Add ingredient
          </button>
        </div>
      </Section>

      {/* Steps */}
      <Section title="Instructions" subtitle="Step-by-step cooking instructions">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {stepsArray.fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-2"
              >
                <span className="mt-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600 dark:bg-orange-900/40 dark:text-orange-400">
                  {index + 1}
                </span>
                <textarea
                  {...register(`steps.${index}.instruction`)}
                  rows={2}
                  placeholder={`Describe step ${index + 1}...`}
                  className={`${inputClass} flex-1 resize-none`}
                />
                <button
                  type="button"
                  onClick={() => stepsArray.remove(index)}
                  disabled={stepsArray.fields.length === 1}
                  className="mt-1 shrink-0 rounded-2xl p-2.5 text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30 dark:hover:bg-red-900/20"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {errors.steps?.message && <p className="text-xs text-red-500">{errors.steps.message}</p>}

          <button
            type="button"
            onClick={() => stepsArray.append({ instruction: "" })}
            className="flex items-center gap-1.5 rounded-2xl border border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:border-orange-500 hover:text-orange-500 dark:border-gray-700 dark:text-gray-400"
          >
            <Plus size={15} /> Add step
          </button>
        </div>
      </Section>

      {/* Media */}
      <Section title="Photos & Video">
        <FormField label="Cover Image">
          <label className="flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-500 dark:border-gray-700">
            {coverPreview ? (
              <div className="relative h-full w-full">
                <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-gray-400">
                <ImagePlus size={22} />
                <span className="text-sm">Click to upload cover image</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
          </label>
        </FormField>

        <FormField label="Gallery (up to 8 images)">
          <div className="flex flex-wrap gap-3">
            {gallery.map((g, i) => (
              <div key={i} className="relative h-20 w-20 overflow-hidden rounded-2xl">
                <Image src={g.preview} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
                >
                  <X size={11} />
                </button>
              </div>
            ))}
            {gallery.length < 8 && (
              <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-orange-500 dark:border-gray-700">
                <Plus size={18} />
                <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
              </label>
            )}
          </div>
        </FormField>

        <FormField label="Video URL (optional)" error={errors.videoUrl?.message}>
          <input {...register("videoUrl")} placeholder="https://youtube.com/watch?v=..." className={inputClass} />
        </FormField>
      </Section>

      {/* Tags */}
      <Section title="Tags">
        <FormField label="Tags (comma-separated)">
          <input {...register("tags")} placeholder="e.g. spicy, quick, one-pot, gluten-free" className={inputClass} />
        </FormField>
      </Section>

      {/* Actions */}
      <div className="sticky bottom-4 flex justify-end gap-3 rounded-2xl border border-gray-100 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
        <button
          type="button"
          disabled={submitting !== null}
          onClick={handleSubmit((values) => onSubmit(values, "draft"))}
          className="flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {submitting === "draft" && <Loader2 size={15} className="animate-spin" />}
          Save as Draft
        </button>
        <button
          type="button"
          disabled={submitting !== null}
          onClick={handleSubmit((values) => onSubmit(values, "publish"))}
          className="flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
        >
          {submitting === "publish" && <Loader2 size={15} className="animate-spin" />}
          Publish Recipe
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100";

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}