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
            <div className="relative flex gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-slate-100">
              <div className="flex gap-1 items-center ">
                <Icon icon="Delete" />
                Delete
              </div>
            </div>
          }
          onCancel={() => {}}
          onDelete={onDelete}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default SectionActions;
