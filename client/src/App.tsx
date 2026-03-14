import "./index.css";

function App() {
	const apiUrl = import.meta.env.VITE_SERVER_URI;
	fetch(`${apiUrl}/todos`)
		.then((res) => res.json())
		.then((result) => {
			console.log(result);
		})
		.catch((err) => console.error("Fetch error:", err));
	return (
		<>
			<p className='text-gray-600'>Your app is ready!</p>
		</>
	);
}

export default App;
