import React, { useState } from 'react';
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
import { Button } from './ui/button';
import { Input } from './ui/input';
import { fnCreateNotes } from '@/services/apiNotes';
import { Textarea } from './ui/textarea';
import * as Yup from 'yup';
// minimum 3 and maximum 50 characters
const schema = Yup.object().shape({
  content: Yup.string()
    .required('Content is required')
    .min(3, 'Content must be at least 3 characters')
    .max(50, 'Content must be at most 50 characters'),
});

const CreateNotes = ({ trigger, projectId, setrefetch }) => {
  console.log(projectId);
  const [content, setcontent] = useState('');
  const [state, setstate] = useState({
    loading: false,
    error: '',
    success: false,
    message: '',
  });

  const handleSubmit = async e => {
    e?.preventDefault();
    try {
      setstate({ loading: true, error: '', success: false, message: '' });
      await schema.validate({ content }, { abortEarly: false });
      const res = await fnCreateNotes({ content, projectId });
      // console.log(res.data);
      setcontent('');
      setstate({ loading: false, error: '', success: true, message: res.message });
      setrefetch(v => !v);
    } catch (error) {
      // console.log(error);
      if (error.inner) {
        setstate({ loading: false, error: error.errors[0], success: false, message: '' });
      } else {
        setstate({ loading: false, error: error.message, success: false, message: '' });
      }
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {state.error && <p className="text-red-600">{state.error}</p>}
            {state.message && <p className="text-green-600">{state.message}</p>}
            <DialogTitle>Add Notes</DialogTitle>
            <DialogDescription>
              You can add notes here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div>
            {/* <Input
                            type="text"
                            placeholder="Enter Notes"
                            className="w-full h-30"
                            onChange={(e) => setcontent(e.target.value)}
                            value={content}
                        /> */}
            <Textarea
              placeholder="Enter Notes"
              className="w-full h-32 resize-none"
              onChange={e => setcontent(e.target.value)}
              value={content}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit} type="submit" disabled={state.loading}>
              {state.loading ? 'Adding...' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNotes;
