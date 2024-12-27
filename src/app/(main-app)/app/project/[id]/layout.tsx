import {
  getProjectSectionsOptions,
  getProjectTasksOptions,
} from "@/lib/react-query/options";
import { QueryClient } from "@tanstack/react-query";
import React, { ReactNode } from "react";

type Props = {
  params: {
    id: string;
  };
  children: ReactNode;
};

const ProjectLayout = async ({ params, children }: Props) => {
  const queryClient = new QueryClient();
  const projectId = params.id.split("-").slice(-5).join("-");
  await queryClient.prefetchQuery(getProjectTasksOptions(projectId));
  await queryClient.prefetchQuery(getProjectSectionsOptions(projectId));

  const title = params.id
    .split("-")
    .slice(0, -5)
    .map((w) => w[0].toUpperCase() + w.substring(1))
    .join(" ");

  return (
    <div className=" w-full h-screen py-5">
      <header className="w-full flex items-center justify-between">
        <h3>My Projects/</h3>
        <div>Some actions</div>
      </header>
      <div className="mt-8 container mx-auto w-full max-w-5xl">
        <div className="w-full flex flex-col gap-5">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;
