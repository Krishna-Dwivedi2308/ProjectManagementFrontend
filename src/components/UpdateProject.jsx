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
import { fnUpdateProjectById } from '@/services/apiProject.js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
const UpdateProject = ({ open, onOpenChange, id, onUpdate }) => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    name: '',
    description: '',
  });
  const [state, setstate] = useState({
    loading: false,
    error: '',
    success: false,
    message: '',
  });
  const handleChange = e => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async e => {
    e?.preventDefault();
    // below two if statements are to remove empty strings and place undefined at their place so that Yup can validate only the ones that are not empty and unnecessary errors are not shown for fields(because they contain empty strings string by default) that the user does not wish to enter

    const payload = {
      name: formdata.name,
      description: formdata.description,
    };
    if (!formdata.name || formdata.name.trim() === '') {
      delete payload.name;
      // setformdata is async so the api call may still be done with old value so build a paylaod instead to call api
      //   setformdata(prev => ({ ...prev, name: undefined }));
    }
    if (!formdata.description || formdata.description.trim() === '') {
      delete payload.description;
      //   setformdata(prev => ({ ...prev, description: undefined }));
    }

    if (!payload.name && !payload.description) {
      setstate({
        loading: false,
        error: 'At least one field is required',
        success: false,
        message: '',
      });
      return;
    }
    // console.log(formdata);

    const schema = Yup.object().shape({
      name: Yup.string()
        // .required('Project name is Required')
        .notRequired()
        .min(3, 'Project name must be at least 3 chars')
        .max(30, 'Project name must be at most 30 chars'),
      description: Yup.string()
        .notRequired()
        // .required('Project description is Required')
        .min(5, 'Project description must be at least 5 chars')
        .max(500, 'Project description must be at most 500 chars'),
    });
    try {
      setstate({ loading: true, error: '', success: false, message: '' });
      // console.log(payload);

      await schema.validate(
        // { name: formdata.name, description: formdata.description },
        payload, //yup will validate only what is present and ignore the rest which is not present
        { abortEarly: false }
      );
      const res = await fnUpdateProjectById(id, payload);
      // console.log(res.data);
      setstate({ loading: false, error: '', success: true, message: res.message });

      // here , instead of reloading the page we can just update the state of the project
      // so we have triggered a re render using a function at the parent .
      // window.location.reload();
      onOpenChange(false);
      onUpdate(p => !p);
    } catch (err) {
      // console.log(err);
      if (err.name === 'ValidationError') {
        // Yup: err.errors is an array of messages
        setstate({ loading: false, error: err.errors[0], success: false, message: '' });
      } else {
        // API / network error
        setstate({
          loading: false,
          error: err.message || 'Something went wrong',
          success: false,
          message: '',
        });
      }
      // setstate({ loading: false, error: error.errors[0] || error.message, success: false, message: '' });
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            {state.error && <p className="text-red-500">{state.error}</p>}
            {state.message && <p className="text-green-600">{state.message}</p>}
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>
                Make changes to your project here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Input
                  name="name"
                  placeholder="Project Name"
                  value={formdata.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Input
                  name="description"
                  placeholder="Project Description"
                  value={formdata.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={state.loading} onClick={handleSubmit}>
                {state.loading ? 'Saving...' : 'Save changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default UpdateProject;
