import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const businesses = [
  "Accounting",
  "Acupuncture",
  "Appliance Repair",
  "Arborist",
  "Art Restoration",
  "Audio Editing",
  "Audio Production",
  "Auto Detailing",
  "Bakery",
  "Barber Shop",
  "Beauty",
  "Bike Mechanic",
  "Boat Detailing",
  "Bookkeeping",
  "Business Consulting",
  "Cafe",
  "Car Detailing",
  "Career Coaching",
  "Carpentry",
  "Carpet Cleaning",
  "Catering",
  "Chef",
  "Chimney Sweep",
  "Chiropractor",
  "Church",
  "Cleaning",
  "Coaching",
  "Computer Repair",
  "Concrete",
  "Construction",
  "Consulting",
  "Content Writing",
  "Contractor",
  "Copywriting",
  "Counseling",
  "Demolition Contractor",
  "Dentist",
  "Design",
  "Digital Development and Design",
  "Digital Marketing",
  "DJ",
  "Doctor",
  "Dog Training",
  "Dog Walking",
  "Door",
  "Doula",
  "Drywall",
  "Editing",
  "Education",
  "Electrical Contracting",
  "Electrician",
  "Elevator Services",
  "Event Planning",
  "Excavation",
  "Fence Services",
  "Financial Management and Consulting",
  "Financial Planning",
  "Fitness",
  "Flooring",
  "Food Delivery",
  "Furniture Restoration",
  "Garage Door Services",
  "Gardening",
  "General Contracting",
  "Glass Repair and Installation",
  "Grant Writing",
  "Graphic Design",
  "Hair Salon",
  "Hair Stylist",
  "Handyman",
  "Home Inspection",
  "House cleaning",
  "House Painting",
  "HVAC",
  "Illustrating",
  "Installation Services",
  "Insurance Broker",
  "Interior Design",
  "Irrigation Services",
  "IT Consulting",
  "Janitorial Services",
  "Junk Removal",
  "Lactation Consulting",
  "Landscape Design",
  "Landscaping",
  "Law Firm",
  "Lawn Care",
  "Life Coaching",
  "Locksmith Services",
  "Makeup Artist",
  "Marketing",
  "Massage Therapy",
  "Mechanic",
  "Mechanical Contracting",
  "Midwife",
  "Mobile Repair",
  "Mortgage Broker",
  "Music Instruction",
  "Online Entertainment",
  "Online Learning",
  "Online Store",
  "Paving",
  "Personal Organization",
  "Personal Training",
  "Pest Control",
  "Pet Sitting",
  "Photography",
  "Physiotherapy",
  "Piano Repair",
  "Pizza Restaurant",
  "Plumber",
  "Plumbing",
  "Pool & Spa Services",
  "Pool Cleaning",
  "Pooper Scooper",
  "Power Washing",
  "Pressure Washing",
  "Private Investigating",
  "Production and Construction Management",
  "Project Management",
  "Property Maintenance",
  "Property Management",
  "Psychic",
  "Psychology",
  "Public Relations",
  "Real Estate",
  "Real Estate and Construction Consulting",
  "Recruiting",
  "Remodeling",
  "Restaurant",
  "Restoration",
  "Resume Writing",
  "Retail Store",
  "Roofing",
  "Security",
  "Snow Removal",
  "Social Media Management",
  "Social Media Marketing",
  "Soft Washing",
  "Software Development",
  "Solar Repair and Installation",
  "Sports Instruction",
  "Taxi",
  "Tiling",
  "Tour Guide",
  "Tourism",
  "Towing",
  "Translation",
  "Travel Agency",
  "Tree Service",
  "Trucking",
  "Tutoring",
  "UI/UX Design",
  "Video Production",
  "Virtual Assistant",
  "Web Design",
  "Web Development",
  "Well Water Services",
  "Wellness Consultant",
  "Window Washing",
  "Women's Fashion",
  "Writing",
  "Yoga Instruction",
];

const CustomWebsiteForm = () => {
  const formSchema = z.object({
    title: z.string().min(1, "Required"),
    subTitle: z.string().min(1, "Required"),
    business: z.string().min(1, "Required"),
    location: z.string().min(1, "Required"),
    businessName: z.string().min(1, "Required"),
  });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(businesses[0]);
  const filteredBusinesses =
    query === ""
      ? businesses
      : businesses.filter((business) => {
          return business.toLowerCase().includes(query.toLowerCase());
        });

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
    getValues,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return (
    <form className="flex w-full items-center justify-center gap-5 max-sm:flex-col">
      {/* <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            {...register("title")}
            placeholder="Your Business Profile"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600" id="title-error">
              {errors.title.message}
            </p>
          )}
        </div>
      </div>

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
      </div> */}
      <div className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="business"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            What Type of Business are you building?
          </label>
          <Combobox
            value={selected}
            onChange={(val) => {
              setSelected(val);
              setValue("business", val);
            }}
          >
            <div className="relative">
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                className={clsx(
                  "w-full rounded-lg border border-gray-300 py-1.5  pl-3 pr-8 text-sm/6 text-black ",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 ",
                )}
              />
              <Combobox.Button className="group absolute inset-y-0 right-0 px-2.5">
                <ChevronDownIcon className="size-4 " />
              </Combobox.Button>
            </div>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options
                // anchor="bottom"
                className="absolute h-52 w-[90%] overflow-auto rounded-xl border border-gray-300 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
              >
                {filteredBusinesses.map((business) => (
                  <Combobox.Option
                    key={business}
                    value={business}
                    className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-200"
                  >
                    <CheckIcon
                      className={`${business !== selected && "invisible"} size-4 `}
                    />
                    <div className="text-sm/6 text-black">{business}</div>
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </Combobox>
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
      </div>
      <button
        //   onClick={() => handleButtonSubmit(data.name)}
        type="button"
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
