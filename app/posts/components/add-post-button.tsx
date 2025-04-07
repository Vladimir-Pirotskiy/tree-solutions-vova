'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import AddPostForm from './add-post-form';
import { useAddPost } from '@/app/hooks/useAddPost';

export default function AddPostButton() {
  const [open, setOpen] = useState(false);
  const { isPending } = useAddPost();
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Add New Post</Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Post</DialogTitle>
        </DialogHeader>
        
        <AddPostForm onClose={() => setOpen(false)} />
        
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            type="submit"
            disabled={isPending}
            form="add-post-form"
          >
            {isPending ? 'Adding...' : 'Add Post'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}