import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createSubTask } from '@/services/apiSubTasks';
import * as Yup from 'yup';
const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
});
const CreateSubtask = ({ trigger, setRefetch, projectId, taskId }) => {
  const [title, settitle] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState('');
  const [message, setmessage] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setloading(true);
      seterror('');
      await schema.validate({ title }, { abortEarly: false });
      const res = await createSubTask(title, projectId, taskId);
      // console.log(res);
      setRefetch(v => !v);
      setmessage(res.message);
      setloading(false);
      seterror('');
      settitle('');
    } catch (error) {
      console.log(error);
      if (error.inner) {
        seterror(error.errors[0]);
      } else {
        seterror(error.response?.data?.message || error.message);
      }
      setloading(false);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Open Dialog</Button> */}
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            <DialogTitle>Create Subtask</DialogTitle>
            <DialogDescription>
              Directly type the subtask here.(Anyone can create subtasks)
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="name-1">Title</Label>
            <Input
              type="text"
              name="title"
              value={title}
              placeholder="Type the title/subtask here..."
              onChange={e => settitle(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateSubtask;
