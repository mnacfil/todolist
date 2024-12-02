import Project from "./_components/project";
import ToggleAddSection from "@/components/global/toggle-add-section";

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
      <ToggleAddSection />
    </>
  );
};

export default ProjectPage;
