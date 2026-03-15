import { useEffect, useState } from "react";
import {
	handleDelete,
	handleComplete,
	handleEdit,
	handleCreate,
} from "./helpers/helperFunctions";
import { MdDelete, MdEdit, MdCheck, MdClose, MdAdd } from "react-icons/md";
import { LuSave, LuX } from "react-icons/lu";

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
				{!createMode && (
					<button
						onClick={() => setCreateMode(true)}
						className='w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-300'
						title='Add New Todo'>
						<MdAdd size={24} />
						Add New Todo
					</button>
				)}
				{createMode && (
					<div className='mb-6 bg-blue-50 rounded-lg p-4'>
						<p className='mb-2 font-semibold text-blue-600'>Add new todo</p>
						<input
							type='text'
							onChange={(e) => setNewTodoValue(e.target.value)}
							className='border border-blue-300 rounded-lg px-5 py-3 text-xl mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full transition'
							autoFocus
						/>
						<div className='flex gap-2'>
							<button
								onClick={() => {
									setCreateMode(false);
									handleCreate(newTodoValue, apiUrl, setTodos);
								}}
								className='flex items-center justify-center w-8 h-8 rounded hover:bg-green-100 transition text-green-600 text-xl focus:outline-none focus:ring-2 focus:ring-green-300'
								title='Save'>
								<LuSave />
							</button>
							<button
								onClick={() => setCreateMode(false)}
								className='flex items-center justify-center w-8 h-8 rounded hover:bg-red-200 transition text-gray-600 text-xl focus:outline-none focus:ring-2 focus:ring-gray-400'
								title='Cancel'>
								<LuX />
							</button>
						</div>
					</div>
				)}
				{todos.length === 0 ?
					<>
						<p className='text-gray-500 text-center'>No todos found.</p>
					</>
				:	<>
						<ul className='space-y-4'>
							{todos.map((t: Todo) => (
								<li
									key={t._id}
									className='flex items-center justify-between bg-gray-50 rounded-md p-4 border border-gray-200 hover:shadow transition'>
									<div className='flex items-center'>
										<input
											type='checkbox'
											checked={t.isCompleted}
											onChange={() =>
												handleComplete(
													t._id,
													t.isCompleted,
													t.title,
													apiUrl,
													setTodos,
												)
											}
											className='form-checkbox h-5 w-5 text-blue-500 mr-4 cursor-pointer'
										/>
										{editId === t._id ?
											<div className='flex items-center bg-blue-50 rounded-lg p-3 w-full'>
												<input
													type='text'
													value={editValue}
													onChange={(e) => setEditValue(e.target.value)}
													className='border border-blue-300 rounded-lg px-5 py-3 text-xl mr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full transition'
													autoFocus
												/>
												<button
													onClick={() => {
														handleEdit(t._id, editValue, apiUrl, setTodos);
														setEditId(null);
													}}
													className='flex items-center justify-center w-8 h-8 rounded hover:bg-green-100 transition mr-2 text-green-600 text-xl focus:outline-none focus:ring-2 focus:ring-green-300'
													title='Save edit'>
													<MdCheck />
												</button>
												<button
													onClick={() => setEditId(null)}
													className='flex items-center justify-center w-8 h-8 rounded hover:bg-gray-200 transition text-gray-600 text-xl focus:outline-none focus:ring-2 focus:ring-gray-400'
													title='Cancel edit'>
													<MdClose />
												</button>
											</div>
										:	<span
												className={`text-lg font-medium ${t.isCompleted ? "line-through text-gray-400" : "text-gray-700"}`}>
												{t.title}
											</span>
										}
									</div>
									<div className='flex items-center'>
										{editId !== t._id && (
											<>
												<button
													onClick={() => {
														setEditId(t._id);
														setEditValue(t.title);
													}}
													className='ml-2 p-2 rounded hover:bg-yellow-100 transition'
													title='Edit todo'>
													<MdEdit />
												</button>
												<button
													onClick={() => handleDelete(t._id, apiUrl, setTodos)}
													className='ml-2 p-2 rounded hover:bg-red-100 transition'
													title='Delete todo'>
													<MdDelete />
												</button>
											</>
										)}
									</div>
								</li>
							))}
						</ul>
					</>
				}
			</div>
		</div>
	);
}

export default App;
