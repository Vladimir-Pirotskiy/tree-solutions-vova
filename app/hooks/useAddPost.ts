'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POSTS_KEY } from './usePosts';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type NewPost = Omit<Post, 'id'>;

async function addPost(post: NewPost): Promise<Post> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });

  if (!response.ok) throw new Error('Failed to add post');
  return response.json();
}

export function useAddPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: POSTS_KEY });
      const previousPosts = queryClient.getQueryData(POSTS_KEY);

      queryClient.setQueryData<Post[]>(POSTS_KEY, (old = []) => [
        { ...newPost, id: Date.now() },
        ...old,
      ]);

      return { previousPosts };
    },

    onSuccess: (serverPost) => {
      queryClient.setQueryData<Post[]>(POSTS_KEY, (old = []) => {
        const filtered = old.filter((_, index) => index !== 0);
        return [serverPost, ...filtered];
      });
    },

    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(POSTS_KEY, context.previousPosts);
      }
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
  });
}
