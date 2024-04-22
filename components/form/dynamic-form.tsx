"use client";

import { cn, generateZodSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Uploader from "./uploader";
import { useEffect, useState } from "react";

export default function DynamicForm({
  title,
  fields,
  handler,
  handleChange,
}: {
  title: string;
  fields: any[];
  handler: (formData, keys) => void;
  handleChange: (name: string, value: string) => void;
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
    console.log(data);

    try {
      await handler(
        data,
        fields.map((f) => f.name as string),
      );
    } catch (error) {
      console.log(error);
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
        <h2 className="w-full text-center text-2xl font-bold text-primary-500">
          {title}
        </h2>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("space-y-2", { "mt-5": !!title })}
      >
        {fields.map((fff) => (
          <Controller
            key={fff.name}
            name={fff.name}
            control={control}
            render={({ field }) => (
              <div className="flex w-full flex-col">
                {fff.type === "image" ? (
                  <div>
                    <Uploader
                      defaultValue={fff.defaultValue}
                      name={fff.name}
                      label={fff.label}
                      onChange={(value) => {
                        handleChange(fff.name, value);
                        field.onChange(value);
                      }}
                    />
                  </div>
                ) : (
                  <Input
                    {...field}
                    type={fff.type === "email" ? "email" : "text"}
                    label={fff.label}
                    defaultValue={fff.defaultValue as string}
                    placeholder={fff.placeholder}
                    isInvalid={!!errors[fff.name]}
                    errorMessage={
                      errors[fff.name]
                        ? errors[fff.name]!.message?.toString()
                        : ""
                    }
                    onChange={(e) => {
                      handleChange(fff.name, e.target.value);
                      field.onChange(e);
                    }}
                    labelPlacement="outside-left"
                    className="w-full"
                    classNames={{
                      base: "w-full gap-2",
                      mainWrapper: "w-full",
                      label: "whitespace-nowrap",
                    }}
                  />
                )}
              </div>
            )}
          />
        ))}
        <div className="!mt-8 flex w-full items-center justify-center">
          <Button
            type="submit"
            color="primary"
            disabled={loading}
            isLoading={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
