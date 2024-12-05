import MoreActionItem from "@/components/global/more-actions/item";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Props = {
  onEdit: () => void;
  onMove: () => void;
  onDuplicate: () => void;
  onCopyLink: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

const SectionActions = ({
  onDelete,
  onEdit,
  onArchive,
  onCopyLink,
  onDuplicate,
  onMove,
}: Props) => {
  return (
    <>
      <DropdownMenuGroup>
        <MoreActionItem iconName="pencil" label="Edit" onClick={onEdit} />
        <MoreActionItem iconName="move" label="Move to..." onClick={onMove} />
        <MoreActionItem
          iconName="copy-plus"
          label="Copy text"
          onClick={onDuplicate}
        />
        <MoreActionItem
          iconName="link"
          label="Copy link to section"
          onClick={onCopyLink}
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          iconName="archive"
          label="Archive"
          onClick={onArchive}
        />
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

export default SectionActions;
