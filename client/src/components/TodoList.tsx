import { MdClose, MdCheck, MdEdit, MdDelete } from "react-icons/md";

type TodoListProps = {
	id: string;
	isCompleted: boolean;
	title: string;
	apiUrl: string;
	setTodos: React.Dispatch<React.SetStateAction<any[]>>;
	setEditValue: React.Dispatch<React.SetStateAction<string>>;
	handleComplete: (
		id: string,
		isCompleted: boolean,
		title: string,
		apiUrl: string,
		setTodos: React.Dispatch<React.SetStateAction<any[]>>,
	) => void;
	editValue: string;
	setEditId: React.Dispatch<React.SetStateAction<string | null>>;
	handleDelete: (
		id: string,
		apiUrl: string,
		setTodos: React.Dispatch<React.SetStateAction<any[]>>,
	) => void;
	editId: string | null;
	handleEdit: (
		id: string,
		newTitle: string,
		apiUrl: string,
		setTodos: React.Dispatch<React.SetStateAction<any[]>>,
	) => void;
};

const TodoList: React.FC<TodoListProps> = ({
	id,
	isCompleted,
	title,
	apiUrl,
	setTodos,
	setEditValue,
	handleComplete,
	editValue,
	setEditId,
	handleDelete,
	editId,
	handleEdit,
}) => {
	return (
		<li
			key={id}
			className='flex items-center justify-between bg-gray-50 rounded-md p-4 border border-gray-200 hover:shadow transition'>
			<div className='flex items-center'>
				<input
					type='checkbox'
					checked={isCompleted}
					onChange={() =>
						handleComplete(id, isCompleted, title, apiUrl, setTodos)
					}
					className='form-checkbox h-5 w-5 text-blue-500 mr-4 cursor-pointer'
				/>
				{editId === id ?
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
								handleEdit(id, editValue, apiUrl, setTodos);
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
						className={`text-lg font-medium ${isCompleted ? "line-through text-gray-400" : "text-gray-700"}`}>
						{title}
					</span>
				}
			</div>
			<div className='flex items-center'>
				{editId !== id && (
					<>
						<button
							onClick={() => {
								setEditId(id);
								setEditValue(title);
							}}
							className='ml-2 p-2 rounded hover:bg-yellow-100 transition'
							title='Edit todo'>
							<MdEdit />
						</button>
						<button
							onClick={() => handleDelete(id, apiUrl, setTodos)}
							className='ml-2 p-2 rounded hover:bg-red-100 transition'
							title='Delete todo'>
							<MdDelete />
						</button>
					</>
				)}
			</div>
		</li>
	);
};
export default TodoList;
