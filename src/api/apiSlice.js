import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["toGetVideos", "singleVideo", "relatedVideo"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["toGetVideos"],
    }),
    getSingleVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      providesTags: (result, error, arg) => [{ type: "singleVideo", id: arg }],
    }),
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");
        const likes = tags.map((like) => `title_like=${like}`);
        const queryString = `/videos?${likes.join("&")}&_limit=4`;
        return queryString;
      },
      providesTags: (result, error, arg) => [
        { type: "relatedVideo", id: arg.id },
      ],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["toGetVideos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "toGetVideos",
        { type: "singleVideo", id: arg.id },
        { type: "relatedVideo", id: arg.id },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["toGetVideos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetSingleVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
