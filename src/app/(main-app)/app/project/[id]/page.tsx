"use client";

import ToggleAddTask from "@/components/global/toggle-add-task";
import { useAuth } from "@clerk/nextjs";
import Project from "./_components/project";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
};

const ProjectPage = ({ params }: Props) => {
  const projectId = params.id.split("-").slice(-5).join("-");

  return (
    <>
      <Project projectId={projectId} />
    </>
  );
};

export default ProjectPage;
