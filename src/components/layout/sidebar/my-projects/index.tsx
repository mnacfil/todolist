"use client";

import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddProjectForm from "@/components/form/add-project";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getUserProjectsOptions } from "@/lib/react-query/options";
import { useUser } from "@clerk/nextjs";
import { TOTAL_PROJECTS } from "@/constants/config";
import { useState } from "react";
import ProjectLink, { ProjectPlace, ProjectWithRelation } from "./project-link";
import Icon from "@/components/icons/icon";
import Image from "next/image";

const Projects = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithRelation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isPending, data } = useQuery(
    getUserProjectsOptions(user?.id as string)
  );
  if (isPending) {
    return <p>Loading projects...</p>;
  }

  return (
    <div className="my-5 flex flex-col gap-3">
      {/* Favorites */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon icon="Favorite" />
            <p className="text-sm font-semibold text-gray-500">Favorites</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          {data?.data &&
            data.data
              .filter((item) => item.favorite)
              .map((project) => {
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
                    userId={user?.id!}
                    place={ProjectPlace.Favorites}
                    onEditCallback={() => {
                      setSelectedProject(project);
                      setOpen(true);
                      setIsEditing(true);
                    }}
                  />
                );
              })}
        </div>
      </div>
      {/* My Projects */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src={user?.imageUrl ?? ""}
              width={20}
              height={20}
              alt={`${user?.fullName} pic`}
              className="rounded-full"
            />
            <p className="text-sm font-semibold text-gray-500">My Projects</p>
            <span className="text-[10px] leading-3 tracking-wide text-gray-500 p-[2px] bg-gray-100 rounded-sm font-semibold">
              USED: {data?.data?.length}/{TOTAL_PROJECTS}
            </span>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              className="disabled:opacity-50 cursor-pointer disabled:cursor-default"
              disabled={data?.data?.length === TOTAL_PROJECTS}
              onClick={() => setIsEditing(false)}
            >
              <Icon icon="Plus" />
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
                  userId={user?.id!}
                  onEditCallback={() => {
                    setSelectedProject(project);
                    setOpen(true);
                    setIsEditing(true);
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
