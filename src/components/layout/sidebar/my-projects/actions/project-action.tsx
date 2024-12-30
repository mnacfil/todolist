import MoreActionItem from "@/components/global/more-actions/item";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Alert from "@/components/global/alert";
import Icon from "@/components/icons/icon";
import { ProjectWithRelation } from "../project-link";

type Props = {
  data: ProjectWithRelation;
  onEdit: () => void;
  onDelete: () => void;
  onFavorite: () => void;
};

const ProjectAction = ({ data, onDelete, onEdit, onFavorite }: Props) => {
  return (
    <>
      <DropdownMenuGroup>
        <MoreActionItem
          Icon={<Icon icon="Edit" />}
          label="Edit"
          onClick={onEdit}
        />
        {data.favorite ? (
          <MoreActionItem
            Icon={<Icon icon="UnFavorite" />}
            label="Remove from favorites"
            onClick={onFavorite}
          />
        ) : (
          <MoreActionItem
            Icon={<Icon icon="Delete" />}
            label="add to favorites"
            onClick={onFavorite}
          />
        )}
        <MoreActionItem
          Icon={<Icon icon="Duplicate" />}
          color="red"
          label="Duplicate"
        />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Alert
          title="Delete project?"
          description={
            <p className="text-gray-700">
              The <strong className="text-gray-800">{data.title}</strong>{" "}
              project and all of its tasks will be permanently deleted.
            </p>
          }
          onCancel={() => {}}
          onDelete={onDelete}
          trigger={
            <div className="relative flex gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-slate-100">
              <div className="flex gap-1 items-center ">
                <Icon icon="Delete" />
                Delete
              </div>
            </div>
          }
          key={"project-action" + "-" + data.title}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default ProjectAction;
