"use client";

import {
  Button,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { ReactElement, useState } from "react";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import SigninForm from "../form/signin-form";
import RegisterForm from "../form/signup-form";

export default function AuthModal({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState("signin");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const enhancedChild = React.cloneElement(children as ReactElement, {
    onPress: onOpen,
  });

  return (
    <>
      {enhancedChild}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="sm"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {state === "signin" ? "Sign In" : "Register"}
          </ModalHeader>
          <ModalBody>
            {state === "signin" ? <SigninForm /> : <RegisterForm />}
          </ModalBody>
          <ModalFooter className="flex-col items-center">
            {state === "signin" ? (
              <p className="text-sm">
                Not register yet?{" "}
                <Link
                  color="primary"
                  onClick={() => {
                    setState("signup");
                  }}
                  size="sm"
                  className="text-sm hover:cursor-pointer"
                >
                  Register
                </Link>
              </p>
            ) : (
              <p className="text-sm">
                Already have an account?{" "}
                <Link
                  color="primary"
                  onClick={() => {
                    setState("signin");
                  }}
                  size="sm"
                  className="text-sm hover:cursor-pointer"
                >
                  Sign In
                </Link>
              </p>
            )}
            <Divider className="my-4" />
            <Button
              className="w-full"
              startContent={<FaFacebook size={18} color="#4267B2" />}
            >
              Facebook
            </Button>
            <Button className="w-full" startContent={<FaApple size={20} />}>
              Apple
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
