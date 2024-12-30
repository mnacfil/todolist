"use client";

import Icon from "@/components/icons/icon";
import MoreActions from "../more-actions";
import { TaskActions } from "./task-overview/actions";

type Props = {
  title: string;
  onEdit: () => void;
  onSetDate: () => void;
  onComment: () => void;
  onDelete: () => void;
};

const HoverActions = ({
  title,
  onComment,
  onEdit,
  onSetDate,
  onDelete,
}: Props) => {
  return (
    <>
      <Icon icon="Edit" onClick={onEdit} />
      <Icon icon="Date" onClick={onSetDate} />
      <Icon icon="Message" onClick={onComment} />
      <MoreActions>
        <TaskActions title={title} onEdit={onEdit} onDelete={onDelete} />
      </MoreActions>
    </>
  );
};

export default HoverActions;
