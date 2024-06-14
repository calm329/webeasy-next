import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loading as LD, updateSite } from "@/lib/store/slices/site-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { z } from "zod";

type TProps =  {
  subdomain: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateDomainForm = (props: TProps) => {
  const {
    subdomain,
    setOpen,
  } = props;
  const loading = useAppSelector(LD);
  const dispatch = useAppDispatch();
  const formSchema = z.object({
    subdomain: z.string().min(1, "required"),
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

  const onSubmit = async () => {
    try {
      const res = await dispatch(
        updateSite({
          subdomain,
          data: {
            subdomain: getValues("subdomain"),
          },
          keys: ["subdomain"],
        }),
      ).unwrap();
      toast.success("Domain successfully Updated", {
        position: "top-right",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong", {
        position: "top-right",
      });
    }
  };
  return (
    <div>
      {" "}
      <form className="mt-10 space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Sub Domain
          </label>
          <div className="mt-2">
            <input
              {...register("subdomain")}
              type="text"
              autoComplete="subdomain"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.subdomain && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.subdomain.message}
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDomainForm;
