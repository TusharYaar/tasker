const ProgressLevel = ({ level, value, handleSort,active,activeAll}) => {
    return (
      <button className={`rounded bg-${ active || activeAll ? level.color: 'gray'}-400 px-5 py-2 mx-3 ${active ? `ring-4 ring-${level.color}-400 ring-opacity-50` : null}`} onClick={() => handleSort(value)}>
        {" "}
        <h4 className="text-xl">{level.levelTag}</h4>
      </button>
    );
  };
  export default ProgressLevel;