import React from "react";

const Task = ({progress, name, level}) => {
  return (
    <div className="flex justify-start m-4 rounded bg-gray-200">
    <div className={`bg-${level.color}-400 p-8 rounded-l` }></div>
    <div className="flex items-center mx-4">
      <div>{progress}</div>
      <div>{name}</div>
    </div>
    </div>
  );
};

export default Task;
