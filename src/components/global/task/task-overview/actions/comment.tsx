import MoreActionItem from "@/components/global/more-actions/item";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Props = {};

const CommentActions = (props: Props) => {
  return (
    <>
      <DropdownMenuGroup>
        <MoreActionItem iconName="pencil" label="Edit" />
        <MoreActionItem iconName="copy" label="Copy text" />
        <MoreActionItem iconName="link" label="Copy link to comment" />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          iconName="trash-2"
          label="Delete"
          color="text-red-500"
        />
      </DropdownMenuGroup>
    </>
  );
};

export default CommentActions;
