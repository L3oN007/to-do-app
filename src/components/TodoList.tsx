'use client';

import { AddTodo } from '@/components/AddTodo';
import { TodoItem } from '@/components/TodoItem';
import { useState } from 'react';

type Todo = {
	id: number;
	title: string;
	description: string;
	completed: boolean;
};

export function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = (title: string, description: string) => {
		setTodos([
			...todos,
			{ id: Date.now(), title, description, completed: false },
		]);
	};

	const toggleTodo = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id
					? { ...todo, completed: !todo.completed }
					: todo
			)
		);
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div className='space-y-6'>
			<AddTodo onAdd={addTodo} />
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
							onToggle={() => toggleTodo(todo.id)}
							onDelete={() => deleteTodo(todo.id)}
						/>
					))}
				</div>
			)}
		</div>
	);
}
