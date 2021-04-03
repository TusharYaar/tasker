
  import React from 'react';
  import { MdCheck } from "react-icons/md";
  import labelColors from "../Data/labelColors";
const LabelColor = ({ id, handleLabelColor, active }) => {
    return (
      <div>
        <button
          className={`bg-${id}-400 p-3 rounded-full h-10 w-10 mx-2`}
          id={id}
          onClick={handleLabelColor}        >
          {active === id ? <MdCheck /> : null}
        </button>
      </div>
    );
  };

  
  function AllLevelColors({handleLabelColor, active}) {
    const allColors = labelColors.map((color) => (
        <LabelColor
          key={color}
          id={color}
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
  