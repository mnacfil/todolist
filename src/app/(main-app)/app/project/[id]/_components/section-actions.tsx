import Alert from "@/components/global/alert";
import MoreActionItem from "@/components/global/more-actions/item";
import Icon from "@/components/icons/icon";
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
        <MoreActionItem
          Icon={<Icon icon="Edit" />}
          label="Edit"
          onClick={onEdit}
        />
        <MoreActionItem
          Icon={<Icon icon="Move" />}
          label="Move to..."
          onClick={onMove}
        />
        <MoreActionItem
          Icon={<Icon icon="Copy" />}
          label="Copy text"
          onClick={onDuplicate}
        />
        <MoreActionItem
          Icon={<Icon icon="Link" />}
          label="Copy link to section"
          onClick={onCopyLink}
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Edit" />}
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
          trigger={
            <MoreActionItem
              Icon={<Icon icon="Delete" />}
              label="Delete"
              // onClick={onCopyLink}
            />
          }
          onCancel={() => {}}
          onDelete={onDelete}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default SectionActions;
