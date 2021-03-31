import React from 'react';
import Task from './TaskComponent';


class ProjectDetails extends React.Component {
    render() {
        const allTask = this.props.data.tasks.map(task => <Task key={task.taskid} name={task.taskname} progress={task.progress}/>)
        return (
            <div>
                ProjectDetails
                {allTask}
            </div>
        )
    }
}







export default ProjectDetails;