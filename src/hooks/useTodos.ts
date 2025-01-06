import {
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import api from '@/lib/api';
import { ITodo } from '@/types/todo.type';

export function useTodos() {
	const queryClient = useQueryClient();

	const { data: todos = [], isLoading } = useQuery<ITodo[]>({
		queryKey: ['todos'],
		queryFn: () => api.get('/todos').then((res) => res.data),
	});

	const addTodoMutation = useMutation({
		mutationFn: (newTodo: Omit<ITodo, 'id'>) =>
			api.post('/todos', newTodo).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	const updateTodoMutation = useMutation({
		mutationFn: (todo: ITodo) =>
			api.put(`/todos/${todo.id}`, todo).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	const deleteTodoMutation = useMutation({
		mutationFn: (id: string) =>
			api.delete(`/todos/${id}`).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	return {
		todos,
		isLoading,
		addTodo: addTodoMutation.mutate,
		updateTodo: updateTodoMutation.mutate,
		deleteTodo: deleteTodoMutation.mutate,
	};
}
