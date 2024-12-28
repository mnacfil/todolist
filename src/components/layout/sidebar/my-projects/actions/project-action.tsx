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
            <MoreActionItem
              Icon={<Icon icon="Delete" />}
              label="Delete"
              onClick={onDelete}
            />
          }
          key={"project-action" + "-" + data.title}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default ProjectAction;
