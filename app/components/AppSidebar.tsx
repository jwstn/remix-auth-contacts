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
import { Link } from "react-router";

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
// import { authClient } from "@/lib/auth-client";

// import { FormProvider, useForm } from "@conform-to/react";

import { ChevronsUpDown, LogOut, PlusCircleIcon } from "lucide-react";
import { toast } from "sonner";

// export const logoutUser = createServerFn({ method: "POST" }).handler(
//   async () => {
//     await authClient.signOut();
//   },
// );

export function AppSidebar({ contacts }) {
  //   const { q } = Route.useSearch();
  //   const { data: session } = authClient.useSession();

  //   const contacts = useSuspenseQuery(contactsQueryOptions(q));
  //   const navigate = Route.useNavigate();

  //   const [form] = useForm({
  //     onSubmit: async (event) => {
  //       event.preventDefault();
  //       event.stopPropagation();

  //       await logoutUser();

  //       navigate({ to: "/login" });
  //       toast.success("Logged out successfull 🚀");
  //     },
  //   });

  return (
    <Sidebar>
      <SidebarContent>
        <form className="flex flex-nowrap gap-2 px-2 mt-5">
          <Input
            name="q"
            type="search"
            defaultValue={""}
            placeholder="Search users"
            className="w-full"
            aria-label="Search users"
          />
          <Link to="/contacts/new" className={cn(buttonVariants({ size: "icon" }), "min-w-10")}>
            <PlusCircleIcon />
          </Link>
        </form>
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
                  {/* <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{session?.user?.name}</span>
                    <span className="truncate text-xs">{session?.user?.email}</span>
                  </div> */}
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
                      {/* <AvatarImage src={session?.user?.image} alt={session?.user?.name} /> */}
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      {/* <span className="truncate font-semibold">{session?.user?.name}</span> */}
                      {/* <span className="truncate text-xs">{session?.user?.email}</span> */}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {/* <FormProvider context={form.context}>
                    <form id={form.id} method="POST" onSubmit={form.onSubmit}>
                      <DropdownMenuItem asChild>
                        <Button variant="outline" type="submit">
                          <LogOut className="mr-2" />
                          Logout
                        </Button>
                      </DropdownMenuItem>
                    </form>
                  </FormProvider> */}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
