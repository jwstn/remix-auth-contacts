import { buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { Form, Link } from "react-router";

import { Input } from "@/components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronsUpDown, LogOut, PlusCircleIcon } from "lucide-react";

type AppSidebarProps = {
  contacts: any[];
  user: any;
  query: string | null | undefined;
};

export function AppSidebar({ contacts, user, query }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <Form id="search-form" className="flex flex-nowrap gap-2 px-2 mt-5">
          <Input
            name="q"
            type="search"
            defaultValue={query || ""}
            placeholder="Search users"
            className="w-full"
            aria-label="Search users"
          />
          <Link to="/contacts/new" className={cn(buttonVariants({ size: "icon" }), "min-w-10")}>
            <PlusCircleIcon />
          </Link>
        </Form>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel className="text-base flex justify-between">
              Contacts
              <Link className="text-sm text-muted-foreground" to="/">
                Reset
              </Link>
            </SidebarGroupLabel>
            <SidebarMenu>
              {[...contacts].map((item) => (
                <SidebarMenuItem key={item?.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={`/contacts/${item.id}`}
                      className={cn(buttonVariants({ variant: "link" }), "text-lg justify-start")}
                    >
                      <span>{item?.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.image} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={false ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Form method="post" action="/logout">
                    <DropdownMenuItem asChild>
                      <Button variant="outline" type="submit">
                        <LogOut className="mr-2" />
                        Logout
                      </Button>
                    </DropdownMenuItem>
                  </Form>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
