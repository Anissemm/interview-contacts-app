import apiSlice from "../api/apiSlice"

export type Contact = {
    id: number
    userId: number
    name: string
    lastname: string
    email: string
    phoneNumber: string
}

export type ContactSearchQuery = {
    q?: string
}

export type DeleteSearchQuery = {
    userId: string
    id: string
}

const contactApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getContacts: build.query<Contact[], string | undefined>({
            query: (searchQuery) => {
                if (searchQuery) {
                    return `contacts?${new URLSearchParams({ q: searchQuery }).toString()}`
                }
                return 'contacts'
            },
            providesTags: ['Contact']
        }),
        addContact: build.mutation<Contact, Omit<Contact, 'id'>>({
            query: (contact) => ({
                url: 'contacts',
                method: 'POST',
                body: contact
            }),
            invalidatesTags: ['Contact']
        }),
        deleteContact: build.mutation<string | {}, number>({
            query: (id) => ({
                url: `contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact']
        }),
        updateContact: build.mutation<Contact, { id: number, updatedData: Partial<Omit<Contact, 'id' | 'userId'>> }>({
            query: ({ id, updatedData }) => ({
                url: `contacts/${id}`,
                method: 'PATCH',
                body: updatedData
            }),
            invalidatesTags: ['Contact']

        })
    })
})

export const {
    useGetContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation,
    useUpdateContactMutation } = contactApiSlice

