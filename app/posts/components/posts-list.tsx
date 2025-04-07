'use client';

import Link from 'next/link';
import { usePosts, POSTS_KEY } from '@/app/hooks/usePosts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Post } from '@/app/hooks/useAddPost';

export default function PostsList({ initialData }: { initialData: Post[] }) {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    queryClient.setQueryData(POSTS_KEY, (oldData) => oldData ?? initialData);
  }, [initialData, queryClient]);
  
  const { data: posts, isLoading, isError } = usePosts();
  const postsData = posts || initialData;
  
  if (isError) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Failed to load posts. Please try again later.</p>
      </div>
    );
  }
  
  if (postsData.length === 0 && !isLoading) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">No posts found. Add a new post to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {postsData.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <CardDescription>Post #{post.id} by User #{post.userId}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{post.body}</p>
      </CardContent>
      <CardFooter>
        <Link 
          href={`/posts/${post.id}`}
          className="text-sm text-foreground/70 hover:text-foreground underline underline-offset-4"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  );
}