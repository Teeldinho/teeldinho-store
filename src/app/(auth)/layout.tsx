const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="flex flex-col gap-8  w-screen min-h-screen bg-background/20 items-center justify-center">{children}</div>;
};

export default AuthLayout;
