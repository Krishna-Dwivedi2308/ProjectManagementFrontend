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
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { fnCreateProject } from '@/services/apiProject';
const CreateProject = ({ trigger, id }) => {
  const [state, setstate] = useState({
    loading: false,
    error: '',
    success: false,
    message: '',
    validationError: {},
  });
  const [formData, setformData] = useState({
    organizationId: id,
    name: '',
    description: '',
  });
  const handleInput = e => {
    setformData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };
  const handleSubmit = async e => {
    e?.preventDefault();
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Project name is Required')
        .min(3, 'Project name must be at least 3 chars')
        .max(30, 'Project name must be at most 50 chars'),
      description: Yup.string()
        .required('Project description is Required')
        .min(3, 'Project description must be at least 3 chars')
        .max(100, 'Project description must be at most 100 chars'),
    });
    try {
      setstate({ loading: true, error: '', success: false, message: '' });
      await schema.validate(formData, { abortEarly: false });
      const res = await fnCreateProject(formData);
      setstate({
        loading: false,
        error: '',
        success: true,
        message: 'Project created successfully',
      });
      setformData({ organizationId: id, name: '', description: '' });
      window.location.reload();
    } catch (error) {
      setstate({ loading: false, error: error.message, success: false, message: '' });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent>
          {state.error && <p className="text-red-600">{state.error}</p>}
          {state.message && <p className="text-green-600">{state.message}</p>}
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Welcome to creating your New Project.Type in the Name and Description for the Project
              you wish to create .
            </DialogDescription>
          </DialogHeader>

          <Input
            type="text"
            name="name"
            placeholder="Project Name"
            value={state.name}
            onChange={handleInput} //setformData(e.target.value)}
            className="w-full"
          />

          <Input
            type="text"
            name="description"
            placeholder="Project Description"
            value={state.description}
            onChange={handleInput} //setformData()e.target.value)}
            className="w-full"
          />
          {/* {state.validationError.name && (
            <p className="text-red-600">{state.validationError.name}</p>
          )} */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProject;
