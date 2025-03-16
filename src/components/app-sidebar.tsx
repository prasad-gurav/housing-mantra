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
  import { LayoutGrid } from "lucide-react";

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
							<div className="flex items-center gap-2">
								<LayoutGrid
									color="primary"
									size={44}
									className="fill-white bg-primary p-2 rounded-lg"
								/>
								<h6>Housing Mantra</h6>
							</div>

							{items.map((item) => (
								<SidebarMenuItem key={item.title} className="my-4">
									<SidebarMenuButton>
										<a
											href={item.url}
											className="flex items-center gap-2  text-rose-500"
										>
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