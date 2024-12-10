"use client";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddProjectForm from "@/components/form/add-project";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getUserProjectsOptions } from "@/lib/react-query/options";
import { useAuth } from "@clerk/nextjs";
import { TOTAL_PROJECTS } from "@/constants/config";
import { useState } from "react";
import ProjectLink, { ProjectWithRelation } from "./project";

type Props = {};

const MyProjects = (props: Props) => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithRelation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isPending, data } = useQuery(
    getUserProjectsOptions(userId as string)
  );

  console.log(selectedProject);

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <p className="text-sm font-semibold text-gray-500">My Projects</p>
          <span className="text-xs text-gray-500 p-[2px] bg-gray-100 rounded-sm font-semibold">
            USED: {data?.data?.length}/{TOTAL_PROJECTS}
          </span>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            className="disabled:opacity-50 cursor-pointer disabled:cursor-default"
            disabled={data?.data?.length === TOTAL_PROJECTS}
            onClick={() => setIsEditing(false)}
          >
            <Plus size={16} />
          </DialogTrigger>
          <DialogContent className="p-0">
            <h3 className="pt-4 pl-4">Add project</h3>
            <Separator />
            <div className="px-4 pb-4">
              <AddProjectForm
                onCancel={() => setOpen(false)}
                isEditing={isEditing}
                currentData={selectedProject}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col w-full">
        {isPending && <p>Loading projects...</p>}
        {data?.data &&
          data.data.map((project) => {
            const words = project.title.toLowerCase().split(" ");
            const title =
              words.length > 1
                ? words.filter((word) => Boolean(word)).join("-")
                : words.join("");
            const projectHref = `/app/project/${title}-${project.id}`;
            const isActive = pathname.includes(title);
            return (
              <ProjectLink
                key={projectHref}
                data={project}
                isActive={isActive}
                href={projectHref}
                userId={userId!}
                onEditCallback={(data) => {
                  setSelectedProject(data);
                  setOpen(true);
                  setIsEditing(true);
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MyProjects;
