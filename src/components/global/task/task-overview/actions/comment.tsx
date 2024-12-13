import MoreActionItem from "@/components/global/more-actions/item";
import Icon from "@/components/icons/icon";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const CommentActions = ({ onDelete, onEdit }: Props) => {
  return (
    <>
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Edit" />}
          label="Edit"
          onClick={onEdit}
        />
        <MoreActionItem Icon={<Icon icon="Copy" />} label="Copy text" />
        <MoreActionItem
          Icon={<Icon icon="Link" />}
          label="Copy link to comment"
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Delete" />}
          label="Delete"
          color="text-red-500"
          onClick={onDelete}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default CommentActions;
