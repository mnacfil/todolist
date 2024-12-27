import Project from "./_components/project";
import ToggleAddSection from "@/components/global/toggle-add-section";
import Sections from "./_components/sections";
import { QueryClient } from "@tanstack/react-query";
import {
  getProjectSectionsOptions,
  getProjectTasksOptions,
} from "@/lib/react-query/options";

type Props = {
  params: {
    id: string;
  };
};

const ProjectPage = async ({ params }: Props) => {
  const projectId = params.id.split("-").slice(-5).join("-");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getProjectTasksOptions(projectId));
  await queryClient.prefetchQuery(getProjectSectionsOptions(projectId));

  return (
    <>
      <Project projectId={projectId} />
      <Sections projectId={projectId} />
      <ToggleAddSection projectId={projectId} />
    </>
  );
};

export default ProjectPage;
