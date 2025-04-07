import PostsListSkeleton from '@/app/posts/components/posts-list-skeleton';

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Posts</h1>
      <PostsListSkeleton />
    </main>
  );
}
