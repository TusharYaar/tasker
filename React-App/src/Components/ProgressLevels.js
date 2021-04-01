const ProgressLevels = ({ levels,handleSort }) => {
  const allLevels = levels.map((level, index) => (
    <ProgressLevel key={index} level={level} value={index} handleSort={handleSort} />
  ));
  return (
    <div className="flex justify-start">
      {" "}
      {allLevels}
      <button className="rounded bg-gray-400 px-5 py-2 mx-3" onClick={()=> handleSort(null)}>
        <h4>All</h4>
      </button>
    </div>
  );
};

const ProgressLevel = ({ level, value, handleSort}) => {
  return (
    <button className={`rounded bg-${level.color}-300 px-5 py-2 mx-3`} onClick={() => handleSort(value)}>
      {" "}
      <h4>{level.levelTag}</h4>
    </button>
  );
};
export default ProgressLevels;
