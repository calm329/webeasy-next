"use client";

import { cn, generateZodSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Uploader from "./uploader";
import { type FormField } from "@/types";

export default function DynamicForm({
  title,
  fields,
  handler,
  handleChange,
  handleBack,
  handleNext,
}: {
  title?: string;
  fields: any[];
  handler: (formData: any, keys: string[]) => void;
  handleChange: (name: string, value: string) => void;
  handleBack?: () => void;
  handleNext?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const zodSchema = generateZodSchema(fields);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);

    try {
      await handler(
        data,
        fields.map((f) => f.name as string),
      );

      handleNext?.();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    for (const f of fields) {
      setValue(f.name, f.defaultValue);
    }
  }, [fields]);

  return (
    <>
      {title && (
        <h2 className="w-full text-center text-2xl font-bold">{title}</h2>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-2">
        {fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            control={control}
            errors={errors}
            handleChange={handleChange}
          />
        ))}
        <FormNavigation handleBack={handleBack} loading={loading} />
      </form>
    </>
  );
}

function FormField({
  field,
  control,
  errors,
  handleChange,
}: {
  field: FormField;
  control: any;
  errors: any;
  handleChange: (name: string, value: string) => void;
}) {
  const f: FormField = field;

  return (
    <Controller
      key={field.name}
      name={field.name}
      control={control}
      render={({ field }) => (
        <div className="flex w-full flex-col">
          {f.type === "image" ? (
            <div>
              <Uploader
                defaultValue={f.defaultValue}
                name={f.name as "image" | "logo"}
                label={f.label}
                onChange={(value) => {
                  handleChange(f.name, value);
                  field.onChange(value);
                }}
              />
              {errors[field.name] && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {f.label}
              </label>
              <div className="mt-2">
                <input
                  {...field}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={f.placeholder}
                  aria-invalid={errors[field.name] ? "true" : "false"}
                  aria-describedby={field.name}
                  onChange={(e) => {
                    handleChange(f.name, e.target.value);
                    field.onChange(e.target.value);
                  }}
                />
                {errors[field.name] && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
}

function FormNavigation({
  handleBack,
  loading,
}: {
  handleBack?: () => void;
  loading: boolean;
}) {
  return (
    <div
      className={cn("!mt-8 flex w-full items-center", {
        "justify-between": handleBack,
        "justify-center": !handleBack,
      })}
    >
      {handleBack && (
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleBack}
        >
          Back
        </button>
      )}
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto"
      >
        Save
      </button>
    </div>
  );
}
