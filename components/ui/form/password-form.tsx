import { useAppSelector } from "@/lib/store/hooks";
import { appState as AS } from "@/lib/store/slices/site-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const PasswordForm = (props: TProps) => {
  const { setOpen } = props;
  const formSchema = z.object({
    password: z
      .string()
      .min(6, "Please enter a password more than 6 characters"),
  });
  const defaultValues = {
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const appState = useAppSelector(AS);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/update-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword:"nothing",
          newPassword: getValues("password")
        }),
      });

      if (response.status === 200) {
        toast.success("Password created successfully");
        setOpen(false);
      } else {
        const { error } = await response.json();
        toast.error(error);
      }
    } catch (error) {
      console.log("error:creatingPassword", error);
    }finally{
      setLoading(false);
    }
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium leading-6 text-gray-900 "
        >
          Please Enter Password to Proceed.
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("password")}
            placeholder="Enter Password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600" id="password-error">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <button
        //   onClick={() => handleButtonSubmit(data.name)}
        type="submit"
        className={`mx-auto  flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 "}`}
        disabled={loading}
      >
        {loading && <ImSpinner2 className="animate-spin text-lg text-white" />}
        Save Password
      </button>
    </form>
  );
};

export default PasswordForm;
