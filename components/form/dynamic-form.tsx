"use client";

import { generateZodSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function DynamicForm({
  fields,
  handler,
}: {
  fields: any[];
  handler: SubmitHandler<any>;
}) {
  const zodSchema = generateZodSchema(fields);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(zodSchema) });

  const onSubmit: SubmitHandler<any> = (data) => {
    handler(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((f) => (
        <Controller
          key={f.name}
          name={f.name}
          control={control}
          render={({ field }) => (
            <div className="flex w-full flex-col">
              <Input
                {...field}
                type={f.type === "email" ? "email" : "text"}
                label={f.label}
                defaultValue={f.defaultValue}
                placeholder={f.placeholder}
                isInvalid={!!errors[f.name]}
                errorMessage={
                  errors[f.name] ? errors[f.name]!.message?.toString() : ""
                }
                labelPlacement="outside-left"
                className="w-full"
              />
            </div>
          )}
        />
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
}

DynamicForm.defaultProps = {
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      validation: {
        required: true,
        maxLength: 30,
      },
    },
    {
      name: "businessName",
      type: "text",
      label: "Update Business Name",
      placeholder: "Enter your business name",
      validation: {
        required: true,
      },
    },
    {
      name: "ctaLink",
      type: "text",
      label: "Update Call to Action URL",
      placeholder: "Enter a link",
      validation: {
        required: true,
      },
    },
  ],
  handler: () => {},
};
