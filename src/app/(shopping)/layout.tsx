import LayoutHeader from "./shop/_shop-components/LayoutHeader";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8 min-w-screen min-h-screen bg-background">
      <LayoutHeader />
      {children}
    </div>
  );
}
