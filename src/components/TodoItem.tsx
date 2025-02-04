import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ITodo } from '@/types/todo.type';
import { useTodos } from '@/hooks/useTodos';
import { Spinner } from '@/components/ui/spinner';
import { CheckIcon } from '@/components/ui/check-icon';

type TodoItemProps = {
	todo: ITodo;
	onToggle: () => void;
	onDelete: () => void;
};

export function TodoItem({
	todo,
	onToggle,
	onDelete,
}: TodoItemProps) {
	const { isUpdatingTodo, isDeletingTodo } = useTodos();

	return (
		<Card>
			<CardHeader className='flex flex-row items-center space-y-0 pb-2'>
				<CardTitle className='flex-grow mr-2'>
					<div className='flex items-center space-x-2'>
						<Checkbox
							checked={todo.completed}
							onCheckedChange={onToggle}
							className='border-gray-600'
							disabled={isUpdatingTodo}
						/>
						{isUpdatingTodo ? (
							<Spinner />
						) : todo.completed ? (
							<CheckIcon />
						) : null}
						<span
							className={
								todo.completed ? 'line-through text-gray-500' : ''
							}>
							{todo.title}
						</span>
					</div>
				</CardTitle>
				<Button
					variant='ghost'
					size='icon'
					onClick={onDelete}
					className='text-gray-400 hover:text-red-500 '
					disabled={isDeletingTodo}>
					{isDeletingTodo ? (
						<Spinner />
					) : (
						<Trash2 className='h-4 w-4' />
					)}
				</Button>
			</CardHeader>
			<CardContent>
				<CardDescription
					className={
						todo.completed
							? 'line-through text-gray-600'
							: 'text-gray-400'
					}>
					{todo.description}
				</CardDescription>
			</CardContent>
		</Card>
	);
}
