import Sidebar from "@/components/layout/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getTaskOptions,
  getTotalTasksOptions,
  getUserProjectsOptions,
} from "@/lib/react-query/options";
import { currentUser } from "@clerk/nextjs/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  // prefetch all tasks
  await queryClient.prefetchQuery(getTaskOptions);
  await queryClient.prefetchQuery(getTotalTasksOptions);
  await queryClient.prefetchQuery(getUserProjectsOptions(user.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="h-screen w-full flex">
        <Sidebar />
        <ScrollArea className="mx-auto container 2xl:px-14 py-10">
          {children}
        </ScrollArea>
      </main>
    </HydrationBoundary>
  );
};

export default AppLayout;
