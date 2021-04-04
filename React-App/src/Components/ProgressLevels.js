import ProgressLevel from './ProgressLevel';
const ProgressLevels = ({ levels,handleSort,sortTask }) => {
  const allBtn = {
    colorId: "indigo",
    levelTag: "All"
  }
  const allLevels = levels.map((level, index) => (
    <ProgressLevel key={index} level={level} value={index} handleSort={handleSort} active={sortTask===index} activeAll={sortTask===null} />
  ));
  return (
    <div className="flex justify-start my-2 md:my-4 flex-row flex-wrap ">
      {" "}
      {allLevels}
        <ProgressLevel key={levels.length} level={allBtn} value={null} handleSort={handleSort} active={sortTask===null} activeAll={sortTask===null} />
    </div>
  );
};

export default ProgressLevels;
