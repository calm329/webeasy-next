import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
    <>
      <form className="mt-5 space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name")}
          label="Name"
          variant="bordered"
          endContent={
            <FiUser className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
          }
          isInvalid={!!errors.name}
          color={errors.name ? "danger" : "default"}
          errorMessage={errors.name && errors.name.message}
          className="w-full"
        />
        <Input
          {...register("email")}
          label="Email"
          variant="bordered"
          endContent={
            <CiMail className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
          }
          isInvalid={!!errors.email}
          color={errors.email ? "danger" : "default"}
          errorMessage={errors.email && errors.email.message}
          className="w-full"
        />
        <Input
          {...register("password")}
          label="Password"
          variant="bordered"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <IoMdEyeOff className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <IoMdEye className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          isInvalid={!!errors.password}
          color={errors.password ? "danger" : "default"}
          errorMessage={errors.password && errors.password.message}
          className="w-full"
        />
        <Button
          color="primary"
          type="submit"
          className="w-full"
          disabled={loading}
          isLoading={loading}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
}
