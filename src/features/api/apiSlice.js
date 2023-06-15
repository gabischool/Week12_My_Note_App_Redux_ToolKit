
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000' }),
    tagTypes: ['notes'],
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => '/notes',
          // transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['notes']
        }),

        addNote: builder.mutation({
            query: (note) => ({
                url: '/create_note',
                method: 'POST',
                body: note
            }),
            invalidatesTags: ['notes']
        }),

        updateNote: builder.mutation({
            query: ({id, note}) => ({
                url: `/update_note/${id}`,
                method: 'PUT',
                body: note
            }),
            invalidatesTags: ['notes']    
        }),  

        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/delete_note/${id}`,
                method: 'DELETE', 
            }),
            invalidatesTags: ['notes']

        }),
        
    })

})

    export const {
        useGetNotesQuery,
        useAddNoteMutation,
        useUpdateNoteMutation,
        useDeleteNoteMutation
    } = apiSlice