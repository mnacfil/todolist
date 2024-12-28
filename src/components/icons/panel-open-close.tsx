import React from "react";

type Props = {};

export const OpenClosedPanel = (props: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 21 21"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fill-rule="evenodd"
        stroke="#000000"
        stroke-linecap="round"
        stroke-linejoin="round"
        transform="translate(3 3)"
      >
        <path d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z" />

        <path d="m12.5 11.5v-8" />
      </g>
    </svg>
  );
};
