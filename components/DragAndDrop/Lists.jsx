import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Lists = ({ id, name }) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      className="border rounded p-2 my-1"
    >
      {name}
    </div>
  );
};

export default Lists;
