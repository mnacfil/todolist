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
  const { userId } = useAuth();
  const projectId = params.id.split("-").slice(-5).join("-");

  if (!userId) {
    return null;
  }

  return (
    <>
      <Project projectId={projectId} userId={userId} />
      <ToggleAddTask userId={userId} projectId={projectId} />
    </>
  );
};

export default ProjectPage;
