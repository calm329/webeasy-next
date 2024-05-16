"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImSpinner2 } from "react-icons/im";

export default function SecurityForm() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = z.object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
  });

  type UserFormValue = z.infer<typeof formSchema>;

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    const isSame = data.currentPassword === data.newPassword;
    try {
      if (isSame) {
        throw new Error(
          "New Password Should be Different than Existing Password",
        );
      }
      const response = await fetch("/api/auth/update-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        toast.success("Password updated successfully");
      } else {
        const { error } = await response.json();
        toast.error(error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error);
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 justify-center space-y-6  border-t border-gray-200 text-sm leading-6"
      >
        <div className="items-center gap-2 pt-6 sm:flex">
          <label
            htmlFor="currentPassword"
            className="font-medium text-gray-900 sm:w-40 sm:flex-none sm:pr-6"
          >
            Current Password :
          </label>
          <dd className="mt-1 flex max-w-80 flex-col justify-between gap-x-6 max-lg:max-w-full sm:mt-0 sm:flex-auto">
            <input
              {...register("currentPassword")}
              name="currentPassword"
              id="currentPassword"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="******"
            />
            {errors.currentPassword && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.currentPassword.message}
              </p>
            )}
          </dd>
        </div>
        <div className="items-center gap-2 pt-6 sm:flex">
          <label
            htmlFor="newPassword"
            className="font-medium text-gray-900 sm:w-40 sm:flex-none sm:pr-6"
          >
            New Password :
          </label>
          <dd className="mt-1 flex max-w-80 flex-col justify-between gap-x-6 max-lg:max-w-full sm:mt-0 sm:flex-auto">
            <input
              {...register("newPassword")}
              name="newPassword"
              id="newPassword"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              placeholder="******"
            />
            {errors.newPassword && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.newPassword.message}
              </p>
            )}
          </dd>
        </div>

        <div className="pt-5">
          <button
            type="submit"
            className={`mx-auto  flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 max-lg:ml-auto max-lg:mr-0"}`}
            disabled={loading}
          >
            {loading && (
              <ImSpinner2 className="animate-spin text-lg text-white" />
            )}
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
