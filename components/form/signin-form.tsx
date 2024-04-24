import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "sonner";
import { z } from "zod";

export default function SigninForm() {
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  type UserFormValue = z.infer<typeof formSchema>;

  const defaultValues = {
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

    const status = await signIn("email", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (status?.error) {
      toast.error(status?.error, {
        position: "top-right",
      });
    }
    if (status?.ok) {
      toast.success("Login successful", {
        position: "top-right",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <form className="mt-5 space-y-2" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="flex justify-between px-1 py-2">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Remember me
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            Forgot password?
          </Link>
        </div>
        <Button
          color="primary"
          type="submit"
          className="w-full"
          disabled={loading}
          isLoading={loading}
        >
          Sign in
        </Button>
      </form>
    </>
  );
}
