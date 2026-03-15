import { LuSave, LuX } from "react-icons/lu";

interface AddTodoFormProps {
	setNewTodoValue: React.Dispatch<React.SetStateAction<string | null>>;
	setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
	handleCreate: (
		value: string | null,
		apiUrl: string,
		setTodos: React.Dispatch<React.SetStateAction<any>>,
	) => void;
	newTodoValue: string | null;
	apiUrl: string;
	setTodos: React.Dispatch<React.SetStateAction<any>>;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({
	setNewTodoValue,
	setCreateMode,
	handleCreate,
	newTodoValue,
	apiUrl,
	setTodos,
}) => {
	return (
		<div className='mb-6 bg-blue-50 rounded-lg p-4'>
			<p className='mb-2 font-semibold text-blue-600'>Add new todo</p>
			<input
				type='text'
				onChange={(e) => setNewTodoValue(e.target.value)}
				className='border border-blue-300 rounded-lg px-5 py-3 text-xl mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full transition'
				autoFocus
				value={newTodoValue || ""}
			/>
			<div className='flex gap-2'>
				<button
					onClick={() => {
						setCreateMode(false);
						handleCreate(newTodoValue, apiUrl, setTodos);
						setNewTodoValue(null);
					}}
					className={`flex items-center justify-center w-8 h-8 rounded hover:bg-green-100 transition text-green-600 text-xl focus:outline-none focus:ring-2 focus:ring-green-300 ${!newTodoValue || newTodoValue.trim() === "" ? "opacity-50 cursor-not-allowed" : ""}`}
					title='Save'
					disabled={!newTodoValue || newTodoValue.trim() === ""}>
					<LuSave />
				</button>
				<button
					onClick={() => {
						setCreateMode(false);
						setNewTodoValue(null);
					}}
					className='flex items-center justify-center w-8 h-8 rounded hover:bg-red-100 transition text-red-600 text-xl focus:outline-none focus:ring-2 focus:ring-red-300'
					title='Cancel'>
					<LuX />
				</button>
			</div>
		</div>
	);
};

export default AddTodoForm;
