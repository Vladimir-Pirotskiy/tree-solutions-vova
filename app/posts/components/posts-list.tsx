'use client';

import Link from 'next/link';
import { usePosts } from '@/app/hooks/usePosts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function PostsList({ initialData }: { initialData: Post[] }) {
  // Use the prefetched data to avoid refetch
  const { data: posts } = usePosts();
  
  // Use either the fetched data or the initial data from server
  const postsData = posts || initialData;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {postsData.map((post) => (
        <Card key={post.id} className="h-full flex flex-col">
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
      ))}
    </div>
  );
}