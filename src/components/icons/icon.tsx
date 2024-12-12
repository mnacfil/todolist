import React, { SVGProps } from "react";
import { IconType } from "./icon-type";
import * as Icons from "./index";

type IconProps = SVGProps<SVGSVGElement> & {
  icon: IconType;
};

const Icon = ({ icon, ...props }: IconProps) => {
  const Component = React.createElement(Icons[icon], props);
  return <span className="custom-icon">{Component}</span>;
};

export default Icon;
