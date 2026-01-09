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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { Textarea } from './ui/textarea';
// import { Label } from "@/components/ui/label"
import * as Yup from 'yup';
import { fnUpdateTask } from '@/services/apiTasks';
const schema = Yup.object().shape({
  title: Yup.string(),
  description: Yup.string(),
  assignedTo: Yup.string(),
  // assignedToEmail: Yup.string().email("Invalid email").required("Email is required"),
});
export function UpdateTask({ trigger, projectId, members, setrefetch, taskId }) {
  console.log(members);
  console.log(projectId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(assignedTo);

    try {
      setLoading(true);
      setError('');
      await schema.validate({ title, description, assignedTo }, { abortEarly: false });
      const formData = {
        title: title || null,
        description: description || null,
        assignedTo: assignedTo || null,
      };
      const res = await fnUpdateTask(formData, projectId, taskId);
      // console.log(res);

      setMessage(res.message);
      setTitle('');
      setDescription('');
      setAttachments([]);
      setLoading(false);
      setrefetch(v => !v);
    } catch (error) {
      if (error.inner) {
        setError(error.errors[0]);
      } else {
        setError(error.message);
      }
      setLoading(false);
      // console.error(error.errors);
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
            {error && <p className="text-sm text-red-500">{error}</p>}
            {message && <p className="text-sm text-green-500">{message}</p>}
            <DialogTitle>Update/Edit Task</DialogTitle>
            <DialogDescription>
              Just enter the changed final values and click update.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4"></div>
          <div className="grid gap-4 py-2">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Title</label>
              <Input
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Short task title"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Description</label>
              <Textarea
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Detailed description..."
                required
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Assign To </label>
              <Select value={assignedTo} onValueChange={value => setAssignedTo(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {members.map(m => (
                      <SelectItem key={m._id || m.id} value={m.user?._id}>
                        {m.user?.fullname}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
