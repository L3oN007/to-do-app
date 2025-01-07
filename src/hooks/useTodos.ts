import {
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import api from '@/lib/api';
import { ITodo } from '@/types/todo.type';

export function useTodos() {
	const queryClient = useQueryClient();

	const {
		data: todos = [],
		isLoading,
		isFetching,
	} = useQuery<ITodo[]>({
		queryKey: ['todos'],
		queryFn: () => api.get('/todos').then((res) => res.data),
	});

	const addTodoMutation = useMutation({
		mutationFn: (newTodo: Omit<ITodo, 'id'>) =>
			api.post('/todos', newTodo).then((res) => res.data),
		onMutate: async (newTodo) => {
			// Cancel outgoing refetches
			await queryClient.cancelQueries({ queryKey: ['todos'] });

			// Snapshot the previous value
			const previousTodos = queryClient.getQueryData(['todos']);

			// Optimistically update the cache
			const optimisticTodo = {
				...newTodo,
				id: 'temp-' + Date.now(), // temporary ID
			};

			queryClient.setQueryData(['todos'], (old: ITodo[] = []) => [
				...old,
				optimisticTodo,
			]);

			return { previousTodos };
		},
		onError: (_err, _newTodo, context) => {
			// Rollback on error
			queryClient.setQueryData(['todos'], context?.previousTodos);
		},
		onSettled: () => {
			// Refetch after error or success
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	const updateTodoMutation = useMutation({
		mutationFn: (todo: ITodo) =>
			api.put(`/todos/${todo.id}`, todo).then((res) => res.data),
		onMutate: async (updatedTodo) => {
			await queryClient.cancelQueries({ queryKey: ['todos'] });

			const previousTodos = queryClient.getQueryData(['todos']);

			queryClient.setQueryData(['todos'], (old: ITodo[] = []) =>
				old.map((todo) =>
					todo.id === updatedTodo.id ? updatedTodo : todo
				)
			);

			return { previousTodos };
		},
		onError: (_err, _updatedTodo, context) => {
			queryClient.setQueryData(['todos'], context?.previousTodos);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	const deleteTodoMutation = useMutation({
		mutationFn: (id: string) =>
			api.delete(`/todos/${id}`).then((res) => res.data),
		onMutate: async (todoId) => {
			await queryClient.cancelQueries({ queryKey: ['todos'] });

			const previousTodos = queryClient.getQueryData(['todos']);

			queryClient.setQueryData(['todos'], (old: ITodo[] = []) =>
				old.filter((todo) => todo.id !== todoId)
			);

			return { previousTodos };
		},
		onError: (_err, _todoId, context) => {
			queryClient.setQueryData(['todos'], context?.previousTodos);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});

	return {
		todos,
		isLoading,
		isFetching,
		addTodo: addTodoMutation.mutate,
		updateTodo: updateTodoMutation.mutate,
		deleteTodo: deleteTodoMutation.mutate,
		isAddingTodo: addTodoMutation.isPending,
		isUpdatingTodo: updateTodoMutation.isPending,
		isDeletingTodo: deleteTodoMutation.isPending,
	};
}
