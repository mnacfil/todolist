"use client";

import Icon from "@/components/icons/icon";
import MoreActions from "../more-actions";
import { TaskActions } from "./task-overview/actions";

type Props = {
  onEdit: () => void;
  onSetDate: () => void;
  onComment: () => void;
};

const HoverActions = ({ onComment, onEdit, onSetDate }: Props) => {
  return (
    <>
      <Icon icon="Edit" onClick={onEdit} />
      <Icon icon="Date" onClick={onSetDate} />
      <Icon icon="Message" onClick={onComment} />
      <MoreActions>
        <TaskActions onEdit={onEdit} />
      </MoreActions>
    </>
  );
};

export default HoverActions;
