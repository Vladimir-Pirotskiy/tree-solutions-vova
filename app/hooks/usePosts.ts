'use client';

import { useQuery } from '@tanstack/react-query';
import { getPosts, getPost } from '../actions/posts';
import { Post } from './useAddPost';

export const POSTS_KEY = ['posts'];
export const postKey = (id: number) => ['post', id];

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: POSTS_KEY,
    queryFn: getPosts,
    staleTime: 10000,
  });
}

export function usePost(id: number) {
  return useQuery<Post>({
    queryKey: postKey(id),
    queryFn: () => getPost(id),
    enabled: Boolean(id),
  });
}
