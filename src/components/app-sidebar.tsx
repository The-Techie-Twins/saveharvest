"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard,
  Package,
  Truck,
  LineChart,
  Settings,
  Leaf,
  Bell,
  Sparkles,
  Store,
  Receipt
} from "lucide-react"
import { usePathname } from "next/navigation"

const data = {
  coopUser: {
    name: "Jane Doe",
    email: "jane.doe@saveharvest.co",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkYZANPzIg-Af4WduPkqI-BeNcKrZWWGyHZN8hmDHF6krIW-NIJL8Tpruz2P5QxceriLBsBW6jjx6n34ve3rGH7_K7Kw9YHcMiBZEKuK8yAkIVOtP6ZsAUx4Dx-lv2Z2J6XjQySWRYUsYTQS1nuLPxM2WaxBSAAb-ilL2oUOv7xAmiQBIhz21yaCiovwplvQ3pkfPCEJZRHai5zfDK2WPWWLHiZVgeGluGoUuCiwwwoJH8tXIRrPqJtPBic5LLGjHXoPrgzjyvpX94",
  },
  buyerUser: {
    name: "FreshMarket Inc.",
    email: "buyer@freshmarket.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqI1wUZQZW1FhdzwXzv2QBltjZXfj65Xw6xS5yG2rbNcVIpkEro9zVme-j224KnzLnvxiVgzaJ-9zutaOt0d1T_9xd-zY_UYg2gZzoHTaKkhzNsbRKkBZIh84DULPjixiPRRJGujDU3_tb0yXwRwiQ52qAugnm37c-4_4D-GUwO4pqLEAOPVAsgH1aGyJIXtkE3iWk5VF5307o62t9OaB7DhTbN-QiEXqxHu4FgIMVtefCvKNEJBw_It9y96nWbT5UKYnybitetJHZ",
  },
  teams: [
    {
      name: "SaveHarvest",
      logo: <Leaf />,
      plan: "Zero Waste Console",
    },
  ],
  coopNavMain: [
    {
      title: "Dashboard",
      url: "/coop/dashboard",
      icon: <LayoutDashboard />,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/coop/dashboard",
        },
      ],
    },
    {
      title: "Inventory",
      url: "/coop/inventory",
      icon: <Package />,
      items: [
        {
          title: "Manage Stock",
          url: "/coop/inventory",
        },
      ],
    },
    {
      title: "Dispatch",
      url: "/coop/dispatch",
      icon: <Truck />,
      items: [
        {
          title: "Logistics",
          url: "/coop/dispatch",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/coop/analytics",
      icon: <LineChart />,
      items: [
        {
          title: "Reports",
          url: "/coop/analytics",
        },
      ],
    },
    {
      title: "Settings",
      url: "/coop/settings",
      icon: <Settings />,
      items: [
        {
          title: "Account",
          url: "/coop/settings",
        },
      ],
    },
  ],
  buyerNavMain: [
    {
      title: "Marketplace",
      url: "/buyer/marketplace",
      icon: <Store />,
      isActive: true,
      items: [
        {
          title: "Browse Offers",
          url: "/buyer/marketplace",
        },
        {
          title: "Checkout",
          url: "/buyer/checkout",
        },
      ],
    },
    {
      title: "Active Orders",
      url: "/buyer/orders",
      icon: <Receipt />,
      items: [
        {
          title: "Track Deliveries",
          url: "/buyer/orders",
        },
      ],
    },
    {
      title: "Settings",
      url: "/buyer/settings",
      icon: <Settings />,
      items: [
        {
          title: "Warehouse & Billing",
          url: "/buyer/settings",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Zero-waste Insights",
      url: "#",
      icon: <Sparkles />,
    },
    {
      name: "Notifications",
      url: "#",
      icon: <Bell />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const isBuyer = pathname?.startsWith("/buyer")

  const navItems = isBuyer ? data.buyerNavMain : data.coopNavMain
  const currentUser = isBuyer ? data.buyerUser : data.coopUser

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
