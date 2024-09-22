import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi", // Unique key for the reducer
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  tagTypes: ["Todo"], // Defining tag types for cache management
  endpoints: (builder) => ({
    // Get list todos
    getTodos: builder.query({
      query: () => "todos",
      providesTags: (result) =>
        result
          ? [
              ...result.todos.map(({ id }: any) => ({ type: "Todo", id })),
              { type: "Todo", id: "LIST" }, // Tag cho danh sách
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),
    // Add new todo
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "todos/add",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }], // Invalidates the todo list
    }),
    // Update todo
    updateTodo: builder.mutation({
      query: ({ id, ...updatedTodo }) => ({
        url: `todos/${id}`,
        method: "PUT",
        body: updatedTodo,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }], // Invalidates the todo list
    }),
    // Delete todo
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }], // Invalidates the todo list
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
