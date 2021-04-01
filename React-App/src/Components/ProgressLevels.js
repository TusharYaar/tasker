import ProgressLevel from './ProgressLevel';
const ProgressLevels = ({ levels,handleSort,sortTask }) => {
  const allBtn = {
    color: "indigo",
    levelTag: "All"
  }
  const allLevels = levels.map((level, index) => (
    <ProgressLevel key={index} level={level} value={index} handleSort={handleSort} active={sortTask===index || sortTask===null} />
  ));
  return (
    <div className="flex justify-start">
      {" "}
      {allLevels}
      {/* <button className="rounded bg-gray-400 px-5 py-2 mx-3" onClick={()=> handleSort(null)}> */}
        <ProgressLevel key={levels.length} level={allBtn} value={null} handleSort={handleSort} active={sortTask===null} />
      {/* </button> */}
    </div>
  );
};

export default ProgressLevels;
