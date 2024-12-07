"use client";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddProjectForm from "@/components/form/add-project";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getUserProjectsOptions } from "@/lib/react-query/options";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { TOTAL_PROJECTS } from "@/constants/config";

type Props = {};

const MyProjects = (props: Props) => {
  const pathname = usePathname();
  const { userId } = useAuth();

  const { isPending, data } = useQuery(
    getUserProjectsOptions(userId as string)
  );

  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <p className="text-sm font-semibold text-gray-500">My Projects</p>
          <span className="text-xs text-gray-500 p-[2px] bg-gray-100 rounded-sm font-semibold">
            USED: {data?.data?.length}/{TOTAL_PROJECTS}
          </span>
        </div>
        <Dialog>
          <DialogTrigger
            className="disabled:opacity-50 cursor-pointer disabled:cursor-default"
            disabled={data?.data?.length === 5}
          >
            <Plus size={16} />
          </DialogTrigger>
          <DialogContent className="p-0">
            <h3 className="pt-4 pl-4">Add project</h3>
            <Separator />
            <div className="px-4 pb-4">
              <AddProjectForm />
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
              <Link
                key={project.id}
                href={projectHref}
                className={clsx(
                  `flex items-center justify-between p-2 hover:bg-gray-100/50 rounded-sm`,
                  isActive ? "bg-orange-400/10" : "bg-none"
                )}
                prefetch={true}
              >
                <div className="flex items-center space-x-2">
                  <p
                    className={clsx(
                      "text-primary text-sm",
                      isActive && "text-red-800"
                    )}
                  >
                    {project.title}
                  </p>
                </div>
                <p
                  className={clsx(
                    "text-muted-foreground/50 text-sm",
                    isActive && "text-red-800"
                  )}
                >
                  {project?._count?.tasks ?? 0}
                </p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default MyProjects;
