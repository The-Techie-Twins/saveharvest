"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFullBleed = pathname?.startsWith("/coop/dispatch");
  const isBuyer = pathname?.startsWith("/buyer");
  const isFleet = pathname?.startsWith("/fleet");

  let breadcrumbHref = "/coop/dashboard";
  let breadcrumbLabel = "SaveHarvest Console";
  let pageLabel = isFullBleed ? "Dispatch Control" : "Logistics Control";

  if (isBuyer) {
    breadcrumbHref = "/buyer/marketplace";
    breadcrumbLabel = "Buyer Console";
    if (pathname.includes("/checkout")) pageLabel = "Checkout";
    else if (pathname.includes("/orders")) pageLabel = "Active Orders";
    else if (pathname.includes("/settings")) pageLabel = "Settings";
    else pageLabel = "Marketplace";
  } else if (isFleet) {
    breadcrumbHref = "/fleet/dashboard";
    breadcrumbLabel = "Fleet Console";
    if (pathname.includes("/active-job")) pageLabel = "Active Job";
    else if (pathname.includes("/history")) pageLabel = "History";
    else if (pathname.includes("/settings")) pageLabel = "Settings";
    else pageLabel = "Overview";
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className={isFullBleed ? "overflow-hidden" : undefined}>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-primary hover:bg-surface-container" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={breadcrumbHref}>
                    {breadcrumbLabel}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {pageLabel}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {isFullBleed ? (
          // Full-bleed content slot — children own the entire remaining area.
          <div className="flex flex-1 overflow-hidden">{children}</div>
        ) : (
          <div className="flex flex-1 flex-col p-4 pt-0">
            <div className="mx-auto w-full max-w-7xl flex-1 flex flex-col gap-4">
              {children}
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
