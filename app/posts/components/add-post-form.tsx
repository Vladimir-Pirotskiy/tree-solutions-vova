'use client';

import { useState } from 'react';
import { useAddPost, NewPost } from '@/app/hooks/useAddPost';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AddPostFormProps {
  onClose: () => void;
}

export default function AddPostForm({ onClose }: AddPostFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const addPostMutation = useAddPost();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) return;
    
    const newPost: NewPost = {
      title: title.trim(),
      body: body.trim(),
      userId: 1
    };
    
    try {
      await addPostMutation.mutateAsync(newPost);
      setTitle('');
      setBody('');
      onClose();
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };
  
  return (
    <form id="add-post-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Post title"
          disabled={addPostMutation.isPending}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="body">Content</Label>
        <Textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={4}
          placeholder="Post content"
          disabled={addPostMutation.isPending}
        />
      </div>
      
      {addPostMutation.isError && (
        <div className="text-red-500 text-sm">
          Error: Failed to add post. Please try again.
        </div>
      )}
    </form>
  );
}