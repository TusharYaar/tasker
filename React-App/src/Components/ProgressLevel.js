import labelColors from "../Data/labelColors";
const ProgressLevel = ({ level, value, handleSort,active,activeAll}) => {
    const color = labelColors.filter(color => color.id === level.colorId)[0];
    return (
      <button className={`rounded ${ active || activeAll ? color.color: 'bg-gray-400'} md:px-4 px-2 py-1 md:py-2 m-2 ${active ? `ring-4  ${color.ring}  ring-opacity-50` : null}`} onClick={() => handleSort(value)}>
        {" "}
        <h4 className="text-xl">{level.levelTag}</h4>
      </button>
    );
  };
  export default ProgressLevel;