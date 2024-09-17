import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import SavedLink from "../link/SavedLink";

const Column = ({ tasks }) => {
  return (
    <div className="">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((link, index) => (
          <SavedLink id={link.name} link={link} key={index} index={index} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
