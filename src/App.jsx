import { useState, useEffect } from 'react'
import { TaskCreator } from './components/TaskCreator'
import { TaskTable } from './components/TaskTable'
import { VisibilityControl } from './components/VisibilityControl'

function App() {
	const [taskItems, setTaskItems] = useState([])
	const [showCompleted, setShowCompleted] = useState(false)

	const createNewTask = (taskName) => {
		if (!taskItems.find((task) => task.name === taskName)) {
			setTaskItems([...taskItems, { name: taskName, done: false }])
		}
	}

	const toggleTask = (task) => {
		setTaskItems(taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t)))
	}

	const cleanTasks = () => {
		setTaskItems(taskItems.filter((task) => !task.done))
		setShowCompleted(false)
	}

	useEffect(() => {
		let data = localStorage.getItem('task')
		if (data) {
			setTaskItems(JSON.parse(data))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('task', JSON.stringify(taskItems))
	}, [taskItems])

	return (
		<main className='bg-dark vh-100 text-white'>
			<div className='container p-4 col-md-4 offset-md-4'>
				<TaskCreator createNewTask={createNewTask} />
				<TaskTable taskItems={taskItems} toggleTask={toggleTask} />
				<VisibilityControl
					setShowCompleted={(checked) => setShowCompleted(checked)}
					cleanTasks={cleanTasks}
					isChecked={showCompleted}
				/>
				{showCompleted && (
					<TaskTable taskItems={taskItems} toggleTask={toggleTask} showCompleted={showCompleted} />
				)}
			</div>
		</main>
	)
}

export default App
