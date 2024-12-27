import MoreActionItem from "@/components/global/more-actions/item";
import Icon from "@/components/icons/icon";
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
              label="Add Project"
              description="Plan and assign tasks"
              Icon={<Icon icon="Plus" />}
              shortcut="Ctrl E"
              onClick={() => {}}
            />
          </DialogTrigger>
          <DialogContent>Add Project here</DialogContent>
        </Dialog>
        <MoreActionItem
          Icon={<Icon icon="Reminder" />}
          label="Browse templates"
          description="Get started with a project template"
        />
      </DropdownMenuGroup>
    </>
  );
};

export default ProjectsAction;
