import { Suspense } from 'react';
import Link from 'next/link';
import { getPost } from '@/app/actions/posts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const post = await getPost(id);
  
  return {
    title: `${post.title} | Post #${id}`,
    description: post.body.substring(0, 160),
  };
}

function PostSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </CardContent>
    </Card>
  );
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const post = await getPost(id);
  
  return (
    <main className="container mx-auto py-10 px-4">
      <Link 
        href="/posts" 
        className="text-foreground/70 hover:text-foreground mb-6 inline-block"
      >
        ← Back to all posts
      </Link>
      
      <Suspense fallback={<PostSkeleton />}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{post.title}</CardTitle>
            <CardDescription>Post #{post.id} by User #{post.userId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{post.body}</p>
          </CardContent>
          <CardFooter>
            <Link 
              href="/posts" 
              className="bg-foreground text-background px-4 py-2 rounded-md text-sm font-medium"
            >
              Back to all posts
            </Link>
          </CardFooter>
        </Card>
      </Suspense>
    </main>
  );
}