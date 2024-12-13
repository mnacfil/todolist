import React, { SVGProps } from "react";
import { IconType } from "./icon-type";
import * as Icons from "./index";

type IconProps = SVGProps<SVGSVGElement> & {
  icon: IconType;
  onClick?: () => void;
};

const Icon = ({ icon, onClick, ...props }: IconProps) => {
  const Component = React.createElement(Icons[icon], props);
  return (
    <span className="custom-icon cursor-pointer" onClick={onClick}>
      {Component}
    </span>
  );
};

export default Icon;
