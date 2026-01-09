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
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { createOrganization } from '@/services/apiOrganization';

const CreateOrganization = ({ open, onOpenChange }) => {
  const [name, setname] = useState('');
  const [state, setstate] = useState({
    loading: false,
    error: '',
    validationError: '',
    success: false,
    message: '',
  });
  const handleSubmit = async e => {
    e?.preventDefault();
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Organization name is Required')
        .min(3, 'Organization name must be at least 3 chars')
        .max(30, 'Organization name must be at most 50 chars'),
    });
    try {
      setstate({
        loading: true,
        error: '',
        validationError: '',
        success: false,
        message: '',
      });
      await schema.validate({ name: name }, { abortEarly: false });
      const res = await createOrganization({ name });
      // assumig success if control reaches here , so change state
      setstate({
        loading: false,
        error: '',
        validationError: '',
        success: true,
        message: 'Organization created successfully',
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.name === 'ValidationError' && error.inner) {
        // Yup validation errors
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setstate({
          loading: false,
          error: '',
          validationError: newErrors,
          success: false,
          message: '',
        });
        console.log(state);
      } else {
        setstate({
          loading: false,
          error: error.message,
          validationError: '',
          success: false,
          message: '',
        });
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* <DialogTrigger>{trigger}</DialogTrigger> */}
        <DialogContent>
          {state.error && <p className="text-red-600">{state.error}</p>}
          {state.message && <p className="text-green-600">{state.message}</p>}
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
              Welcome to creating your organization.Just name your organization and we'll create one
              for you.
            </DialogDescription>
          </DialogHeader>

          <Input
            type="text"
            placeholder="Organization Name"
            value={name}
            onChange={e => setname(e.target.value)}
            className="w-full"
          />
          {state.validationError.name && (
            <p className="text-red-600">{state.validationError.name}</p>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateOrganization;
