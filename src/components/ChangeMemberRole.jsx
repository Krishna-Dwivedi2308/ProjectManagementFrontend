import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { fnChangeMemberRole } from '@/services/apiProject.js';
const ChangeMemberRole = ({ member, trigger, setrefetch }) => {
  console.log(member);
  const projectId = member?.project;
  console.log(projectId);

  const [formdata, setformdata] = useState({
    memberId: member._id,
    newRole: '',
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

    try {
      setstate({ loading: true, error: '', success: false, message: '' });

      const res = await fnChangeMemberRole(projectId, formdata);

      setstate({ loading: false, error: '', success: true, message: res.message });
      setrefetch(v => !v);
    } catch (error) {
      console.log(error);
      setstate({ loading: false, error: error.message, success: false, message: '' });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
          <DialogTitle>Change Member Role</DialogTitle>

          <DialogDescription>
            Enter the new role you want to assign to {member.user.fullname}
          </DialogDescription>
        </DialogHeader>

        {/* ROLE SELECT DROPDOWN */}
        <div className="my-2">
          <Select
            value={formdata.newRole}
            onValueChange={value => setformdata({ ...formdata, newRole: value })}
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
            {state.loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeMemberRole;
