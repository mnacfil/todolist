import Alert from "@/components/global/alert";
import MoreActionItem from "@/components/global/more-actions/item";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Props = {
  title: string;
  totalTasks: number;
  onEdit: () => void;
  onMove: () => void;
  onDuplicate: () => void;
  onCopyLink: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

const SectionActions = ({
  title,
  totalTasks,
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
        <Alert
          title="Delete section?"
          description={
            <p className="text-gray-700">
              The <strong className="text-gray-800">{title}</strong> section and
              its <strong className="text-gray-800">{totalTasks}</strong> tasks
              will be permanently deleted.
            </p>
          }
          trigger={<p className="text-xs cursor-pointer">Delete</p>}
          onCancel={() => {}}
          onDelete={onDelete}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default SectionActions;
