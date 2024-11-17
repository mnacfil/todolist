import MoreActionItem from "@/components/global/more-actions/item";
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
        <MoreActionItem iconName="pencil" label="Edit" onClick={onEdit} />
        <MoreActionItem iconName="copy" label="Copy text" />
        <MoreActionItem iconName="link" label="Copy link to comment" />
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

export default CommentActions;
