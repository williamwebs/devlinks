"use client";

import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Lists from "./Lists";

const DnD = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "john",
    },
    {
      id: 2,
      name: "jane",
    },
    {
      id: 3,
      name: "jude",
    },
    {
      id: 4,
      name: "James",
    },
  ]);

  const getDataPos = (id) => data.findIndex((d) => d.id === id);

  const handleDragAndDrop = (event) => {
    const { active, over } = event;
    console.log({ active, over });

    if (active.id === over.id) return;

    setData((data) => {
      const originalPos = getDataPos(active.id);
      const newPos = getDataPos(over.id);

      return arrayMove(data, originalPos, newPos);
    });
  };

  return (
    <div className="bg-white px-5 py-2 rounded">
      <DndContext
        onDragEnd={handleDragAndDrop}
        collisionDetection={closestCorners}
      >
        <SortableContext items={data} strategy={verticalListSortingStrategy}>
          {data.map((i) => (
            <Lists key={i.id} id={i.id} name={i.name} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DnD;
