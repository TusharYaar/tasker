const ProgressLevels = ({levels}) => {
const allLevels = levels.map((level,index) => <ProgressLevel key={index} level={level}/>)
    return (
    <div className="flex justify-start"> {allLevels}</div>
)
}

const ProgressLevel = ({level}) => {
    return (
            <div className={`rounded bg-${level.color}-300 px-5 py-2 mx-3`}> <h4>{level.levelTag}</h4></div>
    )
}
export default ProgressLevels