
  import React from 'react';
  import { MdCheck } from "react-icons/md";
  import labelColors from "../Data/labelColors";
const LabelColor = ({ id, handleLabelColor, active,color,ring,text }) => {
    return (
      <div className={`flex flex-col m-2  w-10`}>
        <button
          className={`${color} p-3 rounded-full h-10 w-10 ${active ===id ? ring + " ring-4 ring-opacity-50" : ""}`}
          id={id}
          onClick={handleLabelColor}>
          {active === id ? <MdCheck /> : null}
          
        </button>
        <span className={`text-xs ${text} ${active===id && "underline"} text-center overflow-ellipsis overflow-hidden mt-1`}>{id }</span>
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
          text={color.text}
        />
      ));
      return (
          <div className="flex flex-row items-center flex-wrap">
                {allColors}   
          </div>
      )
  }
  
  export default AllLevelColors;
  