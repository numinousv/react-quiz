import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import DarkModeButton from "./ui/DarkModeButton";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// sample data
const data = {
  navMain: [
    {
      title: "User",
      url: "/index",
      items: [
        {
          title: "Home",
          url: "/",
        },
      ],
    },
    {
      title: "Quiz",
      url: "/quiz",
      items: [
        {
          title: "Quiz",
          url: "/quiz",
        },
        {
          title: "Trivia",
          url: "#",
          isActive: true,
        },
      ],
    },
    {
      title: "Game",
      url: "/game",
      items: [
        {
          title: "Purpose",
          url: "/game",
        },
        {
          title: "Tools used", //skriver typ "reakt, shadcn, tailwind, etc"
          url: "#",
        },
      ],
    },
    {
      title: "page 3 idk",
      url: "#",
      items: [
        {
          title: "behöver idéer",
          url: "#",
        },
        {
          title: "vet inte ännu",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <DarkModeButton />

        {/* vet inte om jag ska ha den här biten men kanske idk */}

        {/* <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1"></div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
