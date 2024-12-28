"use client";

import { Project } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import ProjectAction from "./actions/project-action";
import MoreActions from "@/components/global/more-actions";
import { useProject } from "@/hooks/project";
import { useRouter } from "next/navigation";
import Icon from "@/components/icons/icon";

export type ProjectWithRelation = Project & {
  _count: {
    tasks: number;
  };
};

export enum ProjectPlace {
  My_Projects,
  Favorites,
}

type Props = {
  data: ProjectWithRelation;
  isActive: boolean;
  href: string;
  userId: string;
  place?: ProjectPlace;
  onEditCallback: () => void;
};

const ProjectLink = ({
  data,
  isActive,
  href,
  userId,
  place = ProjectPlace.My_Projects,
  onEditCallback,
}: Props) => {
  const [isHover, setIsHover] = useState(false);
  const { projectMutation } = useProject(userId);
  const router = useRouter();

  return (
    <Link
      key={data.id}
      href={href}
      className={clsx(
        `flex items-center justify-between p-2 hover:bg-gray-100/50 rounded-sm relative`,
        isActive ? "bg-orange-400/10 hover:bg-orange-400/10" : "bg-none"
      )}
      prefetch={true}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex items-center space-x-1">
        <Icon icon="Hash" />
        <p className={clsx("text-primary text-xs", isActive && "text-red-800")}>
          {data.title}
        </p>
      </div>
      <div
        className={clsx(
          "absolute top-[8px] right-[8px]",
          isHover ? "opacity-100 z-10" : "opacity-0 z-10"
        )}
      >
        <MoreActions onClick={() => setIsHover(true)}>
          <ProjectAction
            key={href}
            projectTitle={data.title}
            onDelete={() => {
              projectMutation.remove.mutate(data.id);
              // not working
              router.push("app/inbox");
            }}
            onEdit={() => {
              onEditCallback();
            }}
            onFavorite={() => {
              projectMutation.toggleFavorite.mutate({
                isFavorite: place === ProjectPlace.My_Projects,
                projectId: data.id,
              });
            }}
          />
        </MoreActions>
      </div>
      <p
        className={clsx(
          "absolute top-[8px] right-[8px] text-muted-foreground/50 text-sm",
          isActive && "text-red-800",
          isHover ? "opacity-0 z-0" : "opacity-100 z-10"
        )}
      >
        {data?._count?.tasks ?? 0}
      </p>
    </Link>
  );
};

export default ProjectLink;
