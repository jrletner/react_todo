// create a todo
export async function handleCreate(
	todo: string | null,
	apiUrl: string,
	setTodos: React.Dispatch<React.SetStateAction<any[]>>,
) {
	try {
		const res = await fetch(`${apiUrl}/todos`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: todo }),
		});
		const data = await res.json();
		if (data && data.payload) {
			setTodos((prev) => [...prev, data.payload]);
		}
	} catch (error) {
		console.error("Add todo error:", error);
	}
}

// Edit a todo's title
export async function handleEdit(
	id: string,
	newTitle: string,
	apiUrl: string,
	setTodos: React.Dispatch<React.SetStateAction<any[]>>,
) {
	try {
		const res = await fetch(`${apiUrl}/todos/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: newTitle }),
		});
		const data = await res.json();
		if (data && data.payload) {
			setTodos((prev) =>
				prev.map((todo) =>
					todo._id === id ? { ...todo, title: newTitle } : todo,
				),
			);
		}
	} catch (error) {
		console.error("Edit task error:", error);
	}
}

// delete a todo
export async function handleDelete(
	id: string,
	apiUrl: string,
	setTodos: React.Dispatch<React.SetStateAction<any[]>>,
) {
	try {
		const res = await fetch(`${apiUrl}/todos/${id}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (data && data.success) {
			setTodos((prev) => prev.filter((todo) => todo._id !== id));
		}
	} catch (err) {
		console.error("Delete task error:", err);
	}
}

// toggle todo completed
export async function handleComplete(
	id: string,
	current: boolean,
	title: string,
	apiUrl: string,
	setTodos: React.Dispatch<React.SetStateAction<any[]>>,
) {
	try {
		const res = await fetch(`${apiUrl}/todos/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, isCompleted: !current }),
		});
		const data = await res.json();
		if (data && data.payload) {
			setTodos((prev) =>
				prev.map((todo) =>
					todo._id === id ? { ...todo, isCompleted: !current } : todo,
				),
			);
		}
	} catch (err) {
		console.error("Complete task error:", err);
	}
}
