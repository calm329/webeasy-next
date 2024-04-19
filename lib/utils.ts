import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateZodSchema(fields: any) {
  let schema: any = {};

  fields.forEach((field: any) => {
    let validation = field.validation;
    let zodValidation = z.string();

    if (validation.required) {
      zodValidation = zodValidation.min(1, `${field.label} is required`);
    }

    if (validation.maxLength) {
      zodValidation = zodValidation.max(
        validation.maxLength,
        `${field.label} must be less than ${validation.maxLength} characters`,
      );
    }

    if (validation.pattern) {
      zodValidation = zodValidation.regex(
        new RegExp(validation.pattern),
        `${field.label} must match ${validation.pattern}`,
      );
    }

    schema[field.name] = zodValidation;
  });

  return z.object({ ...schema });
}
