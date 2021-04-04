
  import React from 'react';
  import { MdCheck } from "react-icons/md";
  import labelColors from "../Data/labelColors";
const LabelColor = ({ id, handleLabelColor, active,color,ring }) => {
    return (
      <div>
        <button
          className={`${color} p-3 rounded-full h-10 w-10 mx-2 ${active ===id ? ring + " ring-4 ring-opacity-50" : ""}`}
          id={id}
          onClick={handleLabelColor}>
          {active === id ? <MdCheck /> : null}
        </button>
      </div>
    );
  };

  
  function AllLevelColors({handleLabelColor, active}) {
    const allColors = labelColors.map((color) => (
        <LabelColor
          key={color.id}
          id={color.id}
          color={color.color}
          ring={color.ring}
          handleLabelColor={handleLabelColor}
          active={active}
        />
      ));
      return (
          <div className="flex flex-row items-center">
                {allColors}   
          </div>
      )
  }
  
  export default AllLevelColors;
  