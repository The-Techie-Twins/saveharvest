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
  Sparkles 
} from "lucide-react"

const data = {
  user: {
    name: "Jane Doe",
    email: "jane.doe@saveharvest.co",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkYZANPzIg-Af4WduPkqI-BeNcKrZWWGyHZN8hmDHF6krIW-NIJL8Tpruz2P5QxceriLBsBW6jjx6n34ve3rGH7_K7Kw9YHcMiBZEKuK8yAkIVOtP6ZsAUx4Dx-lv2Z2J6XjQySWRYUsYTQS1nuLPxM2WaxBSAAb-ilL2oUOv7xAmiQBIhz21yaCiovwplvQ3pkfPCEJZRHai5zfDK2WPWWLHiZVgeGluGoUuCiwwwoJH8tXIRrPqJtPBic5LLGjHXoPrgzjyvpX94",
  },
  teams: [
    {
      name: "SaveHarvest",
      logo: <Leaf />,
      plan: "Zero Waste Console",
    },
  ],
  navMain: [
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
