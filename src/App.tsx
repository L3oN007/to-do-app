import { TodoList } from '@/components/TodoList';

function App() {
	return (
		<main className='container mx-auto p-4 max-w-2xl'>
			<h1 className='text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text'>
				Todo App
			</h1>
			<TodoList />
		</main>
	);
}

export default App;
