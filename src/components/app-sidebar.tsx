import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
  } from "@/components/ui/sidebar";
  import { Building2 } from "lucide-react";
  
  export function AppSidebar() {
	const items = [
	  {
		title: "Project",
		url: "project",
		icon: Building2,
	  },
	];
  
	return (
	  <Sidebar>
		<SidebarHeader />
		<SidebarContent>
		  <SidebarGroup>
			<SidebarMenu>
			  {items.map((item) => (
				<SidebarMenuItem key={item.title}>
				  <SidebarMenuButton asChild>
					<a href={item.url} className="flex items-center gap-2 text-lg text-rose-500">
					  <item.icon size={28} />
					  <h4 className="text-lg">{item.title}</h4>
					</a>
				  </SidebarMenuButton>
				</SidebarMenuItem>
			  ))}
			</SidebarMenu>
		  </SidebarGroup>
		</SidebarContent>
		<SidebarFooter />
	  </Sidebar>
	);
  }