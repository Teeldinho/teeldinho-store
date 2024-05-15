import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../../public/store-hero.jpg";
import LoginForm from "./_login-components/LoginForm";
import ButtonNotImplemented from "@/components/reusable-components/ButtonNotImplemented";

export default function Login() {
  return (
    <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">Enter your credentials below to login to your account.</p>
          </div>
          <div className="grid gap-4">
            <LoginForm />

            <ButtonNotImplemented />
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image src={heroImage} fill alt="Login Hero Image" className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}
