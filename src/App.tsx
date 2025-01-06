import { TodoList } from '@/components/TodoList';
import { ReactQueryProvider } from '@/providers/react-query-provider';

function App() {
	return (
		<ReactQueryProvider>
			<main className='container mx-auto p-4 max-w-2xl'>
				<h1 className='text-2xl font-bold mb-8 text-center'>
					Todo List
				</h1>
				<TodoList />
			</main>
		</ReactQueryProvider>
	);
}

export default App;
