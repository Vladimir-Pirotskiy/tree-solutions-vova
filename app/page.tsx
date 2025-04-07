import { Suspense } from 'react';
import PostsListSkeleton from '@/app/posts/components/posts-list-skeleton';
import { getPosts } from '@/app/actions/posts';
import PostsList from '@/app/posts/components/posts-list';

export const metadata = {
  title: 'Posts | JSONPlaceholder',
  description: 'List of posts from JSONPlaceholder API',
};

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen">
      <header className="bg-foreground text-background py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold">JSONPlaceholder Posts</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold">Posts</h1>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList initialData={posts} />
        </Suspense>
      </main>
    </div>
  );
}
