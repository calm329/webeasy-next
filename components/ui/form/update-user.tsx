import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DynamicForm from "./dynamic-form";
import { toast } from "sonner";
import { FormField, TFields, TUser } from "@/types";
import { useMediaQuery } from "usehooks-ts";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";
type TProps = {
  user: TUser;
  getUserData: () => Promise<void>;
};
const UpdateUser = (props: TProps) => {
  const { getUserData, user } = props;
  const { closeDialog } = useResponsiveDialog();
  const [userFields, setUserFields] = useState<FormField[]>([
    {
      name: "avatar",
      type: "image",
      label: "User Avatar",
      defaultValue: "",
      placeholder: "Enter your avatar",
      validation: {
        required: true,
      },
    },
    {
      name: "name",
      type: "text",
      label: "User Name",
      defaultValue: "",
      placeholder: "Enter your name",
      validation: {
        required: true,
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      defaultValue: "",
      placeholder: "Enter your email address",
      validation: {
        required: true,
      },
    },
  ]);
  useEffect(() => {
    if (user) {
      const tempUserFields = userFields;
      if (user.image) {
        tempUserFields[0].defaultValue = user.image;
      }
      tempUserFields[1].defaultValue = user.name as string;
      tempUserFields[2].defaultValue = user.email as string;
      setUserFields([...tempUserFields]);
    }
  }, [user]);
  const matches = useMediaQuery("(max-width: 1024px)");
  return (
    <div>
      {!matches && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update User
          </h2>
        </div>
      )}
      <div className="max-sm:px-5">
        <DynamicForm
          fields={userFields}
          handler={async (data: any, keys: string[]) => {
            try {
              const response = await fetch("/api/auth/update-user", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              if (response.status === 200) {
                toast.success(`User ${open} Updated successfully`);
                closeDialog("updateUser");
                getUserData();
              } else {
                const { error } = await response.json();
                toast.error(error);
              }
            } catch (error) {
              console.error("Error:", error);
              toast.error("Something went wrong", {
                position: "top-right",
              });
            }
          }}
          handleChange={(name, value) => {}}
        />
      </div>
    </div>
  );
};

export default UpdateUser;
