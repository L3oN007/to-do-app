import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type AddTodoProps = {
	onAdd: (title: string, description: string) => void;
};

export function AddTodo({ onAdd }: AddTodoProps) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim()) {
			onAdd(title.trim(), description.trim());
			setTitle('');
			setDescription('');
		}
	};

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<CardHeader>
					<CardTitle>Add New Task</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<Input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Task title'
					/>
					<Textarea
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Task description (optional)'
					/>
				</CardContent>
				<CardFooter>
					<Button
						type='submit'
						className='w-full bg-blue-600 hover:bg-blue-700'>
						<Plus className='h-4 w-4 mr-2' /> Add Task
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
