'use client';

import { AddTodo } from '@/components/AddTodo';
import { TodoItem } from '@/components/TodoItem';
import { Skeleton } from '@/components/ui/skeleton';
import { useTodos } from '@/hooks/useTodos';
import { ITodo } from '@/types/todo.type';

export function TodoList() {
	const {
		todos,
		isLoading,
		isFetching,
		addTodo,
		updateTodo,
		deleteTodo,
	} = useTodos();

	const handleAddTodo = (title: string, description: string) => {
		addTodo({
			title,
			description,
			completed: false,
		});
	};

	const handleToggleTodo = (todo: ITodo) => {
		updateTodo({
			...todo,
			completed: !todo.completed,
		});
	};

	return (
		<div className='space-y-6'>
			<AddTodo onAdd={handleAddTodo} />
			{isLoading || isFetching ? (
				<div className='space-y-4'>
					{[1, 2, 3].map((index) => (
						<div key={index} className='flex items-center space-x-4'>
							<Skeleton className='h-6 w-6' />
							<div className='space-y-2 flex-1'>
								<Skeleton className='h-4 w-[60%]' />
								<Skeleton className='h-3 w-[80%]' />
							</div>
							<Skeleton className='h-8 w-8' />
						</div>
					))}
				</div>
			) : todos.length === 0 ? (
				<div className='text-center text-gray-500 mt-8'>
					No tasks yet. Add a task to get started!
				</div>
			) : (
				<div className='space-y-4'>
					{todos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							onToggle={() => handleToggleTodo(todo)}
							onDelete={() => deleteTodo(todo.id)}
						/>
					))}
				</div>
			)}
		</div>
	);
}
