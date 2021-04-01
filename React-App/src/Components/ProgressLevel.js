const ProgressLevel = ({ level, value, handleSort,active}) => {
    return (
      <button className={`rounded bg-${ active ? level.color: 'gray'}-400 px-5 py-2 mx-3`} onClick={() => handleSort(value)}>
        {" "}
        <h4 className="text-xl">{level.levelTag}</h4>
      </button>
    );
  };
  export default ProgressLevel;