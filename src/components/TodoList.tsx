'use client';

import { AddTodo } from '@/components/AddTodo';
import { TodoItem } from '@/components/TodoItem';
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

	if (isLoading) {
		return <div className='text-center'>Loading...</div>;
	}

	return (
		<div className='space-y-6'>
			<AddTodo onAdd={handleAddTodo} />
			{todos.length === 0 ? (
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
