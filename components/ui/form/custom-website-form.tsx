import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { z } from "zod";

const CustomWebsiteForm = () => {
  const formSchema = z.object({
    title: z.string().min(1, "Required"),
    subTitle: z.string().min(1, "Required"),
    business: z.string().min(1, "Required"),
    location: z.string().min(1, "Required"),
    businessName: z.string().min(1, "Required"),
  });
  const [loading,setLoading] = useState(false)

  const defaultValues = {
    title: "",
    subTitle: "",
    business: "",
    location: "",
    businessName: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return (
    <form className="flex flex-col gap-5 justify-center">
      <div>
        <label
          htmlFor="subTitle"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Subtitle
        </label>
        <div className="mt-2">
          <textarea
            {...register("subTitle")}
            placeholder="We'd love to learn more about your business! Could you please provide some details?"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.subTitle && (
            <p className="mt-2 text-sm text-red-600" id="subTitle-error">
              {errors.subTitle.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="business"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          business
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("business")}
            placeholder="We'd love to learn more about your business! Could you please provide some details?"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.business && (
            <p className="mt-2 text-sm text-red-600" id="business-error">
              {errors.business.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Business location
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("location")}
            placeholder="We'd love to learn more about your business! Could you please provide some details?"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.location && (
            <p className="mt-2 text-sm text-red-600" id="location-error">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="businessName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Business Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("businessName")}
            placeholder="What is the name of your business?"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.businessName && (
            <p className="mt-2 text-sm text-red-600" id="businessName-error">
              {errors.businessName.message}
            </p>
          )}
        </div>
      </div>
      <button
        //   onClick={() => handleButtonSubmit(data.name)}
          type="button"
          className={`mx-auto  flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 "}`}
          disabled={loading}
        >
          {loading && (
            <ImSpinner2 className="animate-spin text-lg text-white" />
          )}
          Submit
        </button>
    </form>
  );
};

export default CustomWebsiteForm;
