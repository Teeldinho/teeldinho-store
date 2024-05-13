import { Login } from "./(auth)/login/page";
import Shop from "./(shopping)/shop/page";
import { usingLoginMutation } from "./_actions/auth-actions";
import { usingGetAllProductsQuery } from "./_actions/products-actions";

export default async function Home() {
  const user = await usingLoginMutation({ username: "kminchelle", password: "0lelplR" });
  // await useGetCurrentUserQuery({});
  // await useGetProductByIdQuery({ value: "1" });

  return (
    <main className="min-h-screen min-w-screen">
      {/* <Login /> */}
      <Shop />
    </main>
  );
}
