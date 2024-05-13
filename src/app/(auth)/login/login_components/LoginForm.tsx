"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { LoginSchema, LoginType } from "@/lib/types/auth-types";
import { usingLoginMutation } from "@/app/_actions/auth-actions";
import ButtonSubmitForm from "@/components/reusable-components/ButtonSubmitForm";
import { MoveRight } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  // Define the form:
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { execute, status } = useAction(usingLoginMutation, {
    onSuccess(data) {
      if (data) {
        router.push("/");

        toast.success(`Welcome, ${data.firstName}!`, {
          description: "You can now access your account.",
        });
      } else {
        toast.error("Incorrect credentials.", {
          description: "Please try again.",
        });
      }
    },

    onError(error) {
      toast.error("Incorrect credentials.", {
        description: "Please try again.",
      });
      //   toast.error("An error has occured:", {
      //     description: JSON.stringify(error, null, 2),
      //   });
    },

    onExecute() {
      toast.info("Logging in...");
    },
  });

  // Define a submit handler:
  function onSubmit(values: LoginType) {
    execute(values);
  }

  return (
    <>
      <Form {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full pt-1">
              <ButtonSubmitForm status={status} idleString="Login" executingString="Logging in...">
                <MoveRight className="size-4" />
              </ButtonSubmitForm>
            </div>
          </form>
        </Form>
      </Form>
    </>
  );
}
