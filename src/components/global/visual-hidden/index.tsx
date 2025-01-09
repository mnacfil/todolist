import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ReactNode } from "react";

const VisualHidden = ({ children }: { children: ReactNode }) => (
  <VisuallyHidden.Root asChild>{children}</VisuallyHidden.Root>
);

export default VisualHidden;
