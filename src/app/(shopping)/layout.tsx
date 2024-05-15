import LayoutHeader from "./shop/_shop-components/LayoutHeader";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8 w-screen min-h-screen bg-background items-center justify-center">
      <LayoutHeader />
      {children}
    </div>
  );
}
