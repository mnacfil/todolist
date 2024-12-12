import MoreActionItem from "@/components/global/more-actions/item";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Alert from "@/components/global/alert";

type Props = {
  projectTitle: string;
  onEdit: () => void;
  onDelete: () => void;
};

const ProjectAction = ({ projectTitle, onDelete, onEdit }: Props) => {
  return (
    <>
      <DropdownMenuGroup>
        <MoreActionItem iconName="pencil" label="Edit" onClick={onEdit} />
        <MoreActionItem iconName="heart" label="Add to favorite" />
        <MoreActionItem iconName="copy" label="Duplicate" />
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
          trigger={<p>Delete</p>}
          key={"project-action" + "-" + projectTitle}
        />
      </DropdownMenuGroup>
    </>
  );
};

export default ProjectAction;
