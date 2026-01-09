import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { AvailableUserRoles } from '@/utils/constants';
import * as Yup from 'yup';
import { fnInviteUser } from '@/services/apiProject.js';

const MemberInvite = ({ open, onOpenChange, id }) => {
  const [formdata, setformdata] = useState({
    email: '',
    role: '',
  });

  const [state, setstate] = useState({
    loading: false,
    error: '',
    success: false,
    message: '',
  });

  const handleSubmit = async e => {
    e?.preventDefault();
    console.log('submit', formdata);

    const schema = Yup.object().shape({
      email: Yup.string().required('Email is Required').email('Enter a valid email'),
      role: Yup.string().required('Role is Required'),
    });
    try {
      setstate({ loading: true, error: '', success: false, message: '' });
      // Validate the correct fields (email, role)
      await schema.validate({ email: formdata.email, role: formdata.role }, { abortEarly: false });
      console.log('here');

      const res = await fnInviteUser({ id, formdata });
      setstate({
        loading: false,
        error: '',
        success: true,
        message: 'Invite sent successfully',
      });
      onOpenChange(false);
    } catch (error) {
      console.log(error);
      if (error.name === 'ValidationError') {
        setstate({
          loading: false,
          error: error?.errors?.[0] ?? 'Validation error',
          success: false,
          message: '',
        });
      } else {
        setstate({
          loading: false,
          error: error?.message ?? 'Something went wrong',
          success: false,
          message: '',
        });
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          {state.error && (
            <div className="my-2">
              <p className="text-red-600">{state.error}</p>
            </div>
          )}
          {state.message && (
            <div className="my-2">
              <p className="text-green-600">{state.message}</p>
            </div>
          )}
          <DialogHeader>
            <DialogTitle>Invite a Member</DialogTitle>
            <DialogDescription>
              The member must already exist in the database. *Only admins can assign admin roles.*
            </DialogDescription>
          </DialogHeader>
          {/* EMAIL INPUT */}
          <div className="my-4">
            <Input
              name="email"
              value={formdata.email}
              onChange={e => setformdata({ ...formdata, email: e.target.value })}
              placeholder="Enter user's email"
            />
          </div>
          {/* ROLE SELECT DROPDOWN */}
          <div className="my-2">
            <Select
              value={formdata.role}
              onValueChange={value => setformdata({ ...formdata, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {AvailableUserRoles.map(role => (
                  <SelectItem key={role} value={role}>
                    {role.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={state.loading}>
              {state.loading ? 'Inviting...' : 'Invite'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberInvite;
