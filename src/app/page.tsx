import { usingLoginMutation } from "./_actions/auth-actions";
import Products from "./products/page";

export default async function Home() {
  const user = await usingLoginMutation({ username: "kminchelle", password: "0lelplR" });
  // await useGetCurrentUserQuery({});
  // await useGetProductByIdQuery({ value: "1" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Products />
    </main>
  );
}
