import { isSubdomainAlreadyInDB, updateSubDomain } from "@/lib/actions";
import { useAppSelector } from "@/lib/store/hooks";
import { appState as AS } from "@/lib/store/slices/site-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { z } from "zod";

const PublishForm = () => {
  const formSchema = z.object({
    subdomain: z
      .string()
      .min(1, "Required")
      .regex(
        /^[a-z0-9]+$/,
        "Subdomain must contain only lowercase letters, numbers, and no spaces",
      ).max(15),
  });
  const defaultValues = {
    subdomain: "",
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
  const appState = useAppSelector(AS)
  const onSubmit = async () => {
    try {
      setLoading(true);
      const isSubdomain = await isSubdomainAlreadyInDB(getValues().subdomain);

      if (isSubdomain) {
        toast.error(
          "Subdomain already exists. Please Enter a unique sub domain",
        );
        setLoading(false);
        return;
      } else {
        const id = searchParams?.get("id");
        const response = await updateSubDomain({ subdomain: getValues().subdomain, id:id?? appState.id });
        router.push("https://" + response.subdomain + ".webeasy.ai");
      }
    } catch (error) {
      console.log("error:creatingCustom", error);
    }
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="subdomain"
          className="text-sm font-medium leading-6 text-gray-900 "
        >
          Enter Subdomain for your site?
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("subdomain")}
            placeholder="What is the name of your business?"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.subdomain && (
            <p className="mt-2 text-sm text-red-600" id="subdomain-error">
              {errors.subdomain.message}
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
        Publish
      </button>
    </form>
  );
};

export default PublishForm;
