import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    // Get list of todos
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: [{ type: "Todo", id: "LIST" }], // Provides a general tag for the entire list
    }),
    // Add a new todo
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }], // Invalidates the entire list after adding
    }),
    // Update an existing todo
    updateTodo: builder.mutation({
      query: ({ id, ...updatedTodo }) => ({
        url: `todos/${id}`,
        method: "PUT",
        body: updatedTodo,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }], // Invalidates the entire list after updating
    }),
    // Delete a todo
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }], // Invalidates the entire list after deleting
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
