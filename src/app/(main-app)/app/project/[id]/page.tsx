import React from "react";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
};

const page = ({ params }: Props) => {
  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  );
};

export default page;
