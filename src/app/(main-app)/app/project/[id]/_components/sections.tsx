"use client";

import { getProjectSectionsOptions } from "@/lib/react-query/options";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import Section from "./section";

type Props = {
  projectId: string;
};

const Sections = ({ projectId }: Props) => {
  const { data, isPending } = useQuery(
    getProjectSectionsOptions(projectId ?? "")
  );

  const { userId } = useAuth();
  if (!userId) return;

  if (isPending) {
    return <p>Loading sections...</p>;
  }

  return (
    <div>
      {data?.data && data.data.length > 0 ? (
        <div className="flex flex-col gap-3 w-full">
          {data.data.map((section) => (
            <Section
              key={section.id}
              projectId={projectId}
              userId={userId}
              data={section}
            />
          ))}
        </div>
      ) : (
        <div>No sections</div>
      )}
    </div>
  );
};

export default Sections;
