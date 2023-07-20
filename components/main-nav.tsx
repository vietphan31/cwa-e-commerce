"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      nested: true,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      nested: true,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      nested: true,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === route.href ||
              (route.nested && pathname.includes(route.href))
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
