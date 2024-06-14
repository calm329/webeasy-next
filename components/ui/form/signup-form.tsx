import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  type UserFormValue = z.infer<typeof formSchema>;

  const defaultValues = {
    name: "",
    email: "",
    password: "",
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

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        await signIn("email", {
          email: data.email,
          password: data.password,
          redirect: true,
        });
        toast.success("Signup successful", {
          position: "top-right",
        });
      } else {
        const { error } = await response.json();
        toast.error(error, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-10 space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Full Name
        </label>
        <div className="mt-2">
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.name.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            {...register("password")}
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <div className="!mt-6">
        <button
          type="submit"
          className={`flex  w-full justify-center gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 "}`}
          disabled={loading}
        >
          {loading && (
            <ImSpinner2 className="animate-spin text-lg text-white" />
          )}
          Sign up
        </button>
      </div>
    </form>
  );
}
