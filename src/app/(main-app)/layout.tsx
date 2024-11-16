import Sidebar from "@/components/layout/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getTaskOptions,
  getTotalTasksOptions,
} from "@/lib/react-query/options";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

const AppLayout = async ({ children }: Props) => {
  const queryClient = new QueryClient();

  // prefetch all tasks
  await queryClient.prefetchQuery(getTaskOptions);
  await queryClient.prefetchQuery(getTotalTasksOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="h-screen w-full flex">
        <Sidebar />
        <ScrollArea className="mx-auto container 2xl:px-14 ">
          {children}
        </ScrollArea>
      </main>
    </HydrationBoundary>
  );
};

export default AppLayout;
