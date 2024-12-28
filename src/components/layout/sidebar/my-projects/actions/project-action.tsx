import MoreActionItem from "@/components/global/more-actions/item";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Alert from "@/components/global/alert";
import Icon from "@/components/icons/icon";

type Props = {
  projectTitle: string;
  onEdit: () => void;
  onDelete: () => void;
  onFavorite: () => void;
};

const ProjectAction = ({
  projectTitle,
  onDelete,
  onEdit,
  onFavorite,
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
          Icon={<Icon icon="Favorite" />}
          label="Add to favorite"
          onClick={onFavorite}
        />
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
              The <strong className="text-gray-800">{projectTitle}</strong>{" "}
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
          key={"project-action" + "-" + projectTitle}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default ProjectAction;
