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
import { fnCreateTask } from '@/services/apiTasks';
// import { Label } from "@/components/ui/label"
import * as Yup from 'yup';
const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  assignedTo: Yup.string().required('It is mandatory to assign task to someone'),
  // assignedToEmail: Yup.string().email("Invalid email").required("Email is required"),
});
export function CreateTask({ trigger, projectId, members, setrefetch }) {
  console.log(members);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const formRef = useRef(null);
  const handleFiles = e => {
    const files = Array.from(e.target.files || []);
    setAttachments(files);
    // console.log(attachments);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(assignedTo);

    try {
      setLoading(true);
      setError('');
      await schema.validate({ title, description, assignedTo }, { abortEarly: false });
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('assignedTo', assignedTo);
      // formData.append("files", attachments);
      attachments.forEach(file => {
        formData.append('files', file);
      });
      const res = await fnCreateTask(formData, projectId);
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
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>Type in the below fields to create a new task.</DialogDescription>
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
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Attachments (optional : You can attach up to five zip files)
              </label>
              <input
                type="file"
                name="attachments"
                multiple
                onChange={handleFiles}
                className="text-sm text-gray-200"
                accept=".zip,"
              />
              {attachments.length > 0 && (
                <div className="mt-2 text-sm text-gray-300">
                  {attachments.map((f, i) => (
                    <div key={i} className="text-xs">
                      {f.name} · {(f.size / 1024).toFixed(1)} KB
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
