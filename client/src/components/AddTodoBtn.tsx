import { MdAdd } from "react-icons/md";

type AddTodoBtnProps = {
	setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTodoBtn: React.FC<AddTodoBtnProps> = ({ setCreateMode }) => {
	return (
		<button
			onClick={() => setCreateMode(true)}
			className='w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-300'
			title='Add New Todo'>
			<MdAdd size={24} />
			Add New Todo
		</button>
	);
};

export default AddTodoBtn;
