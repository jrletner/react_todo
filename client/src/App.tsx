import { useEffect, useState } from "react";
import {
	handleDelete,
	handleComplete,
	handleEdit,
	handleCreate,
} from "./helpers/helperFunctions";
import AddTodoBtn from "./components/AddTodoBtn";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

function App() {
	const apiUrl = import.meta.env.VITE_SERVER_URI;
	type Todo = { _id: string; title: string; isCompleted: boolean };
	const [todos, setTodos] = useState<Todo[]>([]);
	const [editId, setEditId] = useState<string | null>(null);
	const [createMode, setCreateMode] = useState<boolean>(false);
	const [newTodoValue, setNewTodoValue] = useState<string | null>(null);
	const [editValue, setEditValue] = useState<string>("");

	// Fetch todos from the server when the component mounts
	useEffect(() => {
		fetch(`${apiUrl}/todos`)
			.then((res) => res.json())
			.then((data) => {
				setTodos(Array.isArray(data.payload) ? data.payload : []);
			})
			.catch((err) => console.error("Fetch error:", err));
	}, [apiUrl]);

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center py-8'>
			<div className='w-full max-w-md bg-white rounded-lg shadow p-6'>
				<h2 className='text-2xl font-bold mb-6 text-center text-blue-600'>
					Todo List
				</h2>
				{!createMode && <AddTodoBtn setCreateMode={setCreateMode} />}
				{createMode && (
					<AddTodoForm
						setNewTodoValue={setNewTodoValue}
						setCreateMode={setCreateMode}
						handleCreate={handleCreate}
						newTodoValue={newTodoValue}
						apiUrl={apiUrl}
						setTodos={setTodos}
					/>
				)}
				{todos.length === 0 ?
					<>
						<p className='text-gray-500 text-center'>No todos found.</p>
					</>
				:	<>
						<ul className='space-y-4'>
							{todos.map((t: Todo) => (
								<TodoList
									id={t._id}
									isCompleted={t.isCompleted}
									title={t.title}
									apiUrl={apiUrl}
									setTodos={setTodos}
									setEditValue={setEditValue}
									handleComplete={handleComplete}
									editValue={editValue}
									setEditId={setEditId}
									handleDelete={handleDelete}
									editId={editId}
									handleEdit={handleEdit}
								/>
							))}
						</ul>
					</>
				}
			</div>
		</div>
	);
}

export default App;
