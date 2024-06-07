import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { z } from "zod";
import CreatableSelect from "react-select/creatable";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { createNewSite, isSubdomainAlreadyInDB } from "@/lib/actions";
import { getColors } from "@/lib/utils/function";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { toast } from "sonner";
import { IoSearchSharp } from "react-icons/io5";

const options = [
  { value: "Accounting", label: "Accounting" },
  { value: "Acupuncture", label: "Acupuncture" },
  { value: "Appliance Repair", label: "Appliance Repair" },
  { value: "Arborist", label: "Arborist" },
  { value: "Art Restoration", label: "Art Restoration" },
  { value: "Audio Editing", label: "Audio Editing" },
  { value: "Audio Production", label: "Audio Production" },
  { value: "Auto Detailing", label: "Auto Detailing" },
  { value: "Bakery", label: "Bakery" },
  { value: "Barber Shop", label: "Barber Shop" },
  { value: "Beauty", label: "Beauty" },
  { value: "Bike Mechanic", label: "Bike Mechanic" },
  { value: "Boat Detailing", label: "Boat Detailing" },
  { value: "Bookkeeping", label: "Bookkeeping" },
  { value: "Business Consulting", label: "Business Consulting" },
  { value: "Cafe", label: "Cafe" },
  { value: "Car Detailing", label: "Car Detailing" },
  { value: "Career Coaching", label: "Career Coaching" },
  { value: "Carpentry", label: "Carpentry" },
  { value: "Carpet Cleaning", label: "Carpet Cleaning" },
  { value: "Catering", label: "Catering" },
  { value: "Chef", label: "Chef" },
  { value: "Chimney Sweep", label: "Chimney Sweep" },
  { value: "Chiropractor", label: "Chiropractor" },
  { value: "Church", label: "Church" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Coaching", label: "Coaching" },
  { value: "Computer Repair", label: "Computer Repair" },
  { value: "Concrete", label: "Concrete" },
  { value: "Construction", label: "Construction" },
  { value: "Consulting", label: "Consulting" },
  { value: "Content Writing", label: "Content Writing" },
  { value: "Contractor", label: "Contractor" },
  { value: "Copywriting", label: "Copywriting" },
  { value: "Counseling", label: "Counseling" },
  { value: "Demolition Contractor", label: "Demolition Contractor" },
  { value: "Dentist", label: "Dentist" },
  { value: "Design", label: "Design" },
  {
    value: "Digital Development and Design",
    label: "Digital Development and Design",
  },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "DJ", label: "DJ" },
  { value: "Doctor", label: "Doctor" },
  { value: "Dog Training", label: "Dog Training" },
  { value: "Dog Walking", label: "Dog Walking" },
  { value: "Door", label: "Door" },
  { value: "Doula", label: "Doula" },
  { value: "Drywall", label: "Drywall" },
  { value: "Editing", label: "Editing" },
  { value: "Education", label: "Education" },
  { value: "Electrical Contracting", label: "Electrical Contracting" },
  { value: "Electrician", label: "Electrician" },
  { value: "Elevator Services", label: "Elevator Services" },
  { value: "Event Planning", label: "Event Planning" },
  { value: "Excavation", label: "Excavation" },
  { value: "Fence Services", label: "Fence Services" },
  {
    value: "Financial Management and Consulting",
    label: "Financial Management and Consulting",
  },
  { value: "Financial Planning", label: "Financial Planning" },
  { value: "Fitness", label: "Fitness" },
  { value: "Flooring", label: "Flooring" },
  { value: "Food Delivery", label: "Food Delivery" },
  { value: "Furniture Restoration", label: "Furniture Restoration" },
  { value: "Garage Door Services", label: "Garage Door Services" },
  { value: "Gardening", label: "Gardening" },
  { value: "General Contracting", label: "General Contracting" },
  {
    value: "Glass Repair and Installation",
    label: "Glass Repair and Installation",
  },
  { value: "Grant Writing", label: "Grant Writing" },
  { value: "Graphic Design", label: "Graphic Design" },
  { value: "Hair Salon", label: "Hair Salon" },
  { value: "Hair Stylist", label: "Hair Stylist" },
  { value: "Handyman", label: "Handyman" },
  { value: "Home Inspection", label: "Home Inspection" },
  { value: "House cleaning", label: "House cleaning" },
  { value: "House Painting", label: "House Painting" },
  { value: "HVAC", label: "HVAC" },
  { value: "Illustrating", label: "Illustrating" },
  { value: "Installation Services", label: "Installation Services" },
  { value: "Insurance Broker", label: "Insurance Broker" },
  { value: "Interior Design", label: "Interior Design" },
  { value: "Irrigation Services", label: "Irrigation Services" },
  { value: "IT Consulting", label: "IT Consulting" },
  { value: "Janitorial Services", label: "Janitorial Services" },
  { value: "Junk Removal", label: "Junk Removal" },
  { value: "Lactation Consulting", label: "Lactation Consulting" },
  { value: "Landscape Design", label: "Landscape Design" },
  { value: "Landscaping", label: "Landscaping" },
  { value: "Law Firm", label: "Law Firm" },
  { value: "Lawn Care", label: "Lawn Care" },
  { value: "Life Coaching", label: "Life Coaching" },
  { value: "Locksmith Services", label: "Locksmith Services" },
  { value: "Makeup Artist", label: "Makeup Artist" },
  { value: "Marketing", label: "Marketing" },
  { value: "Massage Therapy", label: "Massage Therapy" },
  { value: "Mechanic", label: "Mechanic" },
  { value: "Mechanical Contracting", label: "Mechanical Contracting" },
  { value: "Midwife", label: "Midwife" },
  { value: "Mobile Repair", label: "Mobile Repair" },
  { value: "Mortgage Broker", label: "Mortgage Broker" },
  { value: "Music Instruction", label: "Music Instruction" },
  { value: "Online Entertainment", label: "Online Entertainment" },
  { value: "Online Learning", label: "Online Learning" },
  { value: "Online Store", label: "Online Store" },
  { value: "Paving", label: "Paving" },
  { value: "Personal Organization", label: "Personal Organization" },
  { value: "Personal Training", label: "Personal Training" },
  { value: "Pest Control", label: "Pest Control" },
  { value: "Pet Sitting", label: "Pet Sitting" },
  { value: "Photography", label: "Photography" },
  { value: "Physiotherapy", label: "Physiotherapy" },
  { value: "Piano Repair", label: "Piano Repair" },
  { value: "Pizza Restaurant", label: "Pizza Restaurant" },
  { value: "Plumber", label: "Plumber" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "Pool & Spa Services", label: "Pool & Spa Services" },
  { value: "Pool Cleaning", label: "Pool Cleaning" },
  { value: "Pooper Scooper", label: "Pooper Scooper" },
  { value: "Power Washing", label: "Power Washing" },
  { value: "Pressure Washing", label: "Pressure Washing" },
  { value: "Private Investigating", label: "Private Investigating" },
  {
    value: "Production and Construction Management",
    label: "Production and Construction Management",
  },
  { value: "Project Management", label: "Project Management" },
  { value: "Property Maintenance", label: "Property Maintenance" },
  { value: "Property Management", label: "Property Management" },
  { value: "Psychic", label: "Psychic" },
  { value: "Psychology", label: "Psychology" },
  { value: "Public Relations", label: "Public Relations" },
  { value: "Real Estate", label: "Real Estate" },
  {
    value: "Real Estate and Construction Consulting",
    label: "Real Estate and Construction Consulting",
  },
  { value: "Recruiting", label: "Recruiting" },
  { value: "Remodeling", label: "Remodeling" },
  { value: "Restaurant", label: "Restaurant" },
  { value: "Restoration", label: "Restoration" },
  { value: "Resume Writing", label: "Resume Writing" },
  { value: "Retail Store", label: "Retail Store" },
  { value: "Roofing", label: "Roofing" },
  { value: "Security", label: "Security" },
  { value: "Snow Removal", label: "Snow Removal" },
  { value: "Social Media Management", label: "Social Media Management" },
  { value: "Social Media Marketing", label: "Social Media Marketing" },
  { value: "Soft Washing", label: "Soft Washing" },
  { value: "Software Development", label: "Software Development" },
  {
    value: "Solar Repair and Installation",
    label: "Solar Repair and Installation",
  },
  { value: "Sports Instruction", label: "Sports Instruction" },
  { value: "Taxi", label: "Taxi" },
  { value: "Tiling", label: "Tiling" },
  { value: "Tour Guide", label: "Tour Guide" },
  { value: "Tourism", label: "Tourism" },
  { value: "Towing", label: "Towing" },
  { value: "Translation", label: "Translation" },
  { value: "Travel Agency", label: "Travel Agency" },
  { value: "Tree Service", label: "Tree Service" },
  { value: "Trucking", label: "Trucking" },
  { value: "Tutoring", label: "Tutoring" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Video Production", label: "Video Production" },
  { value: "Virtual Assistant", label: "Virtual Assistant" },
  { value: "Web Design", label: "Web Design" },
  { value: "Web Development", label: "Web Development" },
  { value: "Well Water Services", label: "Well Water Services" },
  { value: "Wellness Consultant", label: "Wellness Consultant" },
  { value: "Window Washing", label: "Window Washing" },
  { value: "Women's Fashion", label: "Women's Fashion" },
  { value: "Writing", label: "Writing" },
  { value: "Yoga Instruction", label: "Yoga Instruction" },
];

const CustomWebsiteForm = () => {
  const formSchema = z.object({
    business: z.string().min(1, "Required"),
    location: z.string().min(1, "Required"),
    businessName: z.string().min(1, "Required"),
  });
  const appState = useAppSelector(AS);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const defaultValues = {
    business: "",
    location: "",
    businessName: "",
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
  console.log("errors", errors);
  const onSubmit = async () => {
    try {
      setLoading(true);
      console.log("onSubmit");

      // const startIsSubdomain = performance.now();
      // // const isSubdomain = await isSubdomainAlreadyInDB(getValues().subdomain);
      // const endIsSubdomain = performance.now();
      // console.log(`isSubdomainAlreadyInDB took ${endIsSubdomain - startIsSubdomain} ms`);

      // if (isSubdomain) {
      //   toast.error("Subdomain already exists. Please Enter a unique sub domain");
      //   setLoading(false);
      //   return;
      // }

      const startContentFetch = performance.now();
      const response = await fetch("/api/content/custom", {
        method: "POST",
        body: JSON.stringify({
          data: {
            businessType: getValues().business,
            location: getValues().location,
            businessName: getValues().businessName,
          },
        }),
      });

      let content = "";
      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        if (chunkValue && chunkValue !== "###") content += chunkValue;
      }
      const endContentFetch = performance.now();
      console.log(
        `Content fetch took ${endContentFetch - startContentFetch} ms`,
      );
      const data = JSON.parse(content);

      const startImageFetch = performance.now();
      const res = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify({
          prompt: getValues().business,
        }),
      });
      const endImageFetch = performance.now();
      console.log(`Image fetch took ${endImageFetch - startImageFetch} ms`);
      const image = await res.json();

      const startLogoFetch = performance.now();
      const logoRes = await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify({
          prompt:
            "generate logo for " +
            getValues().businessName +
            " but don't add living things in it",
        }),
      });
      const endLogoFetch = performance.now();
      console.log(`Logo fetch took ${endLogoFetch - startLogoFetch} ms`);
      const logo = await logoRes.json();

      const startGetColors = performance.now();
      const colors = await getColors(image.imageUrl);
      const endGetColors = performance.now();
      console.log(`getColors took ${endGetColors - startGetColors} ms`);

      console.log("imageUrl", image);
      const finalData = {
        ...appState.aiContent,
        ...data,
        banner: {
          ...data.banner,
          logo: {
            ...data.banner.logo,
            link: logo.imageUrl,
          },
        },
        hero: {
          ...data.hero,
          image: {
            ...data.hero.image,
            imageUrl: image.imageUrl,
          },
        },
        colors: colors,
        businessType: getValues().business,
        location: getValues().location,
      };

      const startCreateSite = performance.now();
      const responseSite = await createNewSite({
        subdomain: "",
        aiResult: JSON.stringify(finalData),
        type: "Custom",
      });
      const endCreateSite = performance.now();
      console.log(`createNewSite took ${endCreateSite - startCreateSite} ms`);

      router.push("/custom?id=" + responseSite.id);
      setLoading(false);
    } catch (error) {
      console.log("error:creatingCustom", error);
    }
  };

  return (
    <form
      className="flex w-full items-center justify-center gap-5 max-sm:flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="business"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            What type of business are you building?
          </label>
          <div className="relative">
            <IoSearchSharp className="absolute top-2.5 left-2 z-1" size={20}/>

            <CreatableSelect
              isClearable
              onChange={(val) => {
                // setSelected(val as string);
                if (val) {
                  setValue("business", val.value);
                }
              }}
              placeholder="Coaching, Photography, Landscaping..."
              options={options}
              className="businessType"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            What is your business location?
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
            What is the name of the business?
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register("businessName")}
              placeholder="Enter your business name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.businessName && (
              <p className="mt-2 text-sm text-red-600" id="businessName-error">
                {errors.businessName.message}
              </p>
            )}
          </div>
        </div>

        {/* <div>
          <label
            htmlFor="subdomain"
            className="block text-sm font-medium leading-6 text-gray-900"
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
        </div> */}
      </div>
      <button
        //   onClick={() => handleButtonSubmit(data.name)}
        type="submit"
        className={`mx-auto  flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 "}`}
        disabled={loading}
      >
        {loading && <ImSpinner2 className="animate-spin text-lg text-white" />}
        Generate your website
      </button>
    </form>
  );
};

export default CustomWebsiteForm;
