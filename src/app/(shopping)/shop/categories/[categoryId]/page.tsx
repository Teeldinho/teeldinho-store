import { usingGetProductsOfACategoryQuery } from "@/app/_actions/products-actions";
import ProductCard from "../../_shop-components/ProductCard";

export default async function Category({ params }: { params: { categoryId: string } }) {
  const { data: productsOfACategory } = await usingGetProductsOfACategoryQuery({ value: params.categoryId });

  if (productsOfACategory?.length === 0) {
    return <div>No products found in this category</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {productsOfACategory?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
