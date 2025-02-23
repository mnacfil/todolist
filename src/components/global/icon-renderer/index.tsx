import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const IconRenderer = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);
  return (
    <LucideIcon
      {...props}
      size={18}
      className="black cursor-pointer"
      strokeWidth={0.5}
    />
  );
};

export default IconRenderer;
