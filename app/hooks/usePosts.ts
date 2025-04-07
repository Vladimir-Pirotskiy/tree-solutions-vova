'use client';

import { useQuery } from '@tanstack/react-query';
import { getPosts, getPost } from '../actions/posts';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });
}