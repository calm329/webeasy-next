import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { z } from "zod";
import CryptoJS from "crypto-js";
import { usePathname, useRouter } from "next/navigation";
import { isSiteBuilderPage, saveState } from "@/lib/utils/function";
import {
  clearPastAndFuture,
  appState as AS,
} from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getSitesByUserId } from "@/lib/fetchers";
import { selectedTemplate as ST } from "@/lib/store/slices/template-slice";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";
import { sectionsData as SD } from "@/lib/store/slices/section-slice";

export default function SigninForm() {
  const { closeDialog } = useResponsiveDialog();
  const [loading, setLoading] = useState(false);
  const [encryptedData, setEncryptedData] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  const selectedTemplate = useAppSelector(ST);
  type UserFormValue = z.infer<typeof formSchema>;

  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const router = useRouter();
  const pathname = usePathname();
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const sections = useAppSelector(SD);

  const encryptData = (email: string, password: string) => {
    const encryptedEmail = CryptoJS.AES.encrypt(email, "secretKey").toString();
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      "secretKey",
    ).toString();
    const encryptedData = {
      email: encryptedEmail,
      password: encryptedPassword,
    };
    localStorage.setItem("userData", JSON.stringify(encryptedData));
    setEncryptedData(JSON.stringify(encryptedData));
  };

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      const status = await signIn("email", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      const sites = await getSitesByUserId();

      if (status?.error) {
        toast.error(status?.error, {
          position: "top-right",
        });
        return;
      }
      if (status?.ok) {
        if (rememberMe) {
          encryptData(data.email, data.password);
        } else {
          const encryptedData = localStorage.getItem("userData");
          if (encryptedData) {
            localStorage.removeItem("userData");
          }
        }
        closeDialog("auth");
      }

      if (isSiteBuilderPage(pathname)) {
        saveState(
          appState,
          dispatch,
          selectedTemplate?.id ?? "",
          sections,
        ).then(() => dispatch(clearPastAndFuture()));
      } else if (sites && sites.length > 0) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const decryptData = () => {
    const encryptedData = localStorage.getItem("userData");
    if (encryptedData) {
      const decryptedData = JSON.parse(encryptedData);
      const decryptedEmail = CryptoJS.AES.decrypt(
        decryptedData.email,
        "secretKey",
      ).toString(CryptoJS.enc.Utf8);
      const decryptedPassword = CryptoJS.AES.decrypt(
        decryptedData.password,
        "secretKey",
      ).toString(CryptoJS.enc.Utf8);
      setValue("email", decryptedEmail);
      setValue("password", decryptedPassword);
    } else {
      setValue("email", "");
      setValue("password", "");
    }
  };

  useEffect(() => {
    const encryptedData = localStorage.getItem("userData");
    if (encryptedData) {
      decryptData();
    }
  }, []);

  return (
    <form className="mt-10 space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium leading-6 text-gray-900"
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
          className="text-sm font-medium leading-6 text-gray-900"
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

      <div className="!mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label
            htmlFor="remember-me"
            className="ml-3 block text-sm leading-6 text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm leading-6">
          <Link
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="!mt-6">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={loading}
        >
          {loading && (
            <ImSpinner2 className="animate-spin text-lg text-white" />
          )}
          Sign in
        </button>
      </div>
    </form>
  );
}
