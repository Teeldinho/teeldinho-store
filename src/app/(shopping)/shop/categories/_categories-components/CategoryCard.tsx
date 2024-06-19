import Link from "next/link";

type CategoryCardProps = {
  icon: React.ReactNode;
  name: string;
  href: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, name, href }) => {
  return (
    <Link
      className="group flex flex-col gap-2 items-center justify-center rounded-lg outline-4 outline-muted/40 p-4 shadow-sm group hover:outline hover:outline-primary bg-muted/15"
      href={href}
    >
      <div className="h-12 w-12 text-muted-foreground transition-colors group-hover:text-primary flex items-center justify-center">{icon}</div>
      <h3 className="text-sm font-medium group-hover:text-primary">{name}</h3>
    </Link>
  );
};

export default CategoryCard;
