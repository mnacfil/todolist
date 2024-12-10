import MoreActionItem from "@/components/global/more-actions/item";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const ProjectAction = ({ onDelete, onEdit }: Props) => {
  return (
    <>
      <DropdownMenuGroup>
        <MoreActionItem iconName="pencil" label="Edit" onClick={onEdit} />
        <MoreActionItem iconName="heart" label="Add to favorite" />
        <MoreActionItem iconName="copy" label="Duplicate" />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          iconName="trash-2"
          label="Delete"
          color="text-red-500"
          onClick={onDelete}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default ProjectAction;
