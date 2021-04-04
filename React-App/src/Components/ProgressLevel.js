import labelColors from "../Data/labelColors";
const ProgressLevel = ({ level, value, handleSort,active,activeAll}) => {
    const color = labelColors.filter(color => color.id === level.colorId)[0];
    return (
      <button className={`rounded ${ active || activeAll ? color.color: 'bg-gray-400'} px-5 py-2 mx-3 ${active ? `ring-4  ${color.ring}  ring-opacity-50` : null}`} onClick={() => handleSort(value)}>
        {" "}
        <h4 className="text-xl">{level.levelTag}</h4>
      </button>
    );
  };
  export default ProgressLevel;