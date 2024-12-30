import React, { ReactNode } from "react";

const ProjectLayout = ({
  params,
  children,
}: {
  children: ReactNode;
  params: {
    id: string;
  };
}) => {
  const decodedIdURI = decodeURIComponent(params.id);
  const title = decodedIdURI
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
