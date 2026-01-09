import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteMemberById } from '@/services/apiProject.js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const DeleteMember = ({ trigger, member, setrefetch }) => {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    loading: false,
    error: '',
    success: false,
    message: '',
  });
  const [open, setOpen] = useState(false);
  // console.log(member);
  const projectId = member?.project;
  const memberId = member?._id;

  const deleteMember = async e => {
    e?.preventDefault();
    // console.log(projectId,memberId);
    try {
      setstate({ loading: true, error: '', success: false, message: '' });
      const res = await deleteMemberById(projectId, memberId);
      setstate({ loading: false, error: '', success: true, message: res.message });
      setOpen(false);
      setrefetch(v => !v);
    } catch (error) {
      console.log(error);
      setstate({ loading: false, error: error.message, success: false, message: '' });
    }
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          {state.message && <p className="text-green-600">{state.message}</p>}
          {state.error && <p className="text-red-600">{state.error}</p>}
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure to remove {member?.user?.fullname}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Note that only Admins and Project Admins can remove
              members.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteMember} disabled={state.loading}>
              {state.loading ? 'Deleting...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteMember;
