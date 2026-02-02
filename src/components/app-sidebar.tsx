import * as React from "react";
import DarkModeButton from "./ui/DarkModeButton";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// sample data
const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Quiz",
      url: "/quiz",
    },
        {
      title: "Emu",
      url: "/emu",
    },
    {
      title: "Game",
      url: "/game",
    },
    {
      title: "Card Game",
      url: "/games/Cardgame",
    },
    {
      title: "Pokemon Game",
      url: "/games/Pokemon",
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Feedback",
      url: "/Feedback",
    },
    {
      title: "Scoreboard",
      url: "/scoreboard",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <DarkModeButton />
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
