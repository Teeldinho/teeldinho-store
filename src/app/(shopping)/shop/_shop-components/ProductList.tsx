import { usingGetAllProductsQuery } from "@/lib/actions/products-actions";
import ProductCard from "./ProductCard";

export default async function ProductList() {
  const { data: products } = await usingGetAllProductsQuery({});

  if (!products) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
