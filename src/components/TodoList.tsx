'use client';

import { AddTodo } from '@/components/AddTodo';
import { TodoItem } from '@/components/TodoItem';
import { Skeleton } from '@/components/ui/skeleton';
import { useTodos } from '@/hooks/useTodos';
import { ITodo } from '@/types/todo.type';

export function TodoList() {
	const { todos, isLoading, addTodo, updateTodo, deleteTodo } =
		useTodos();

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
			{isLoading ? (
				<div className='space-y-3'>
					{[1, 2, 3, 4].map((index) => (
						<div
							key={index}
							className='flex items-start space-x-4 rounded-lg border p-4'>
							<Skeleton className='h-5 w-5 mt-0.5 rounded-sm' />
							<div className='space-y-2.5 flex-1'>
								<Skeleton className='h-5 w-[40%]' />
								<Skeleton className='h-4 w-[65%]' />
							</div>
							<Skeleton className='h-7 w-7 rounded-md' />
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
