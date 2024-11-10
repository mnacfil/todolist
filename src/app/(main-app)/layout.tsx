import Sidebar from "@/components/layout/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AppLayout = async ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="h-screen w-full flex">
        <Sidebar />
        <div className="flex-1 mx-auto max-w-screen-lg h-full p-3 md:py-10 md:px-14 ">
          {children}
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default AppLayout;
