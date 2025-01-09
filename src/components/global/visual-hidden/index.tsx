import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ReactNode } from "react";

export default ({children}:{children:ReactNode}) => <VisuallyHidden.Root asChild>{children}</VisuallyHidden.Root>;
