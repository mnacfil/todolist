import MoreActionItem from "@/components/global/more-actions/item";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Props = {
  onAddProject?: () => {};
  onBrowseTemplate?: () => {};
};

const ProjectsAction = ({ onAddProject, onBrowseTemplate }: Props) => {
  return (
    <>
      <DropdownMenuGroup>
        <Dialog>
          <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
            <MoreActionItem
              iconName="hash"
              label="Add Project"
              description="Plan and assign tasks"
            />
          </DialogTrigger>
          <DialogContent>Add Project here</DialogContent>
        </Dialog>
        <MoreActionItem
          iconName="bookmark"
          label="Browse templates"
          description="Get started with a project template"
        />
      </DropdownMenuGroup>
    </>
  );
};

export default ProjectsAction;
