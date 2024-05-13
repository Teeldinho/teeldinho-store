import { useGetCurrentUserQuery, useLoginMutation } from "./actions/auth-actions";
import { useGetAllCartsQuery } from "./actions/carts-actions";
import { useGetProductByIdQuery } from "./actions/products-actions";

export default async function Home() {
  // const user = await useLoginMutation({ username: "kminchelle", password: "0lelplR" });
  // await useGetCurrentUserQuery({});
  // await useGetProductByIdQuery({ value: "1" });
  await useGetAllCartsQuery({});
  return <main className="flex min-h-screen flex-col items-center justify-between p-24">Hello World</main>;
}
