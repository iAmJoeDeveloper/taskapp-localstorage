import { TaskRow } from './TaskRow'

const TaskTable = ({ taskItems, toggleTask, showCompleted = false }) => {
	const taskTableRows = (doneValue) => {
		return taskItems
			.filter((task) => task.done === doneValue)
			.map((task) => <TaskRow key={task.name} task={task} toggleTask={toggleTask} />)
	}

	return (
		<table className='table table-dark table-striped table-bordered border-secondary'>
			<thead>
				<tr className='table-primary'>
					<th>Task</th>
				</tr>
			</thead>
			<tbody>{taskTableRows(showCompleted)}</tbody>
		</table>
	)
}

export { TaskTable }
