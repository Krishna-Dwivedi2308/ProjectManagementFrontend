import React, { useState } from 'react';
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
import { fnDeleteTaskById } from '@/services/apiTasks';
import { useNavigate } from 'react-router';
const DeleteTaskAlert = ({ trigger, taskId, projectId, setRefetch }) => {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    error: '',
    success: false,
    loading: false,
    message: '',
  });

  const handleDelete = async e => {
    try {
      e?.preventDefault();
      setstate({ loading: true, error: '', success: false, message: '' });
      const res = await fnDeleteTaskById(taskId, projectId);
      setstate({ loading: false, error: '', success: true, message: res.message });
      setRefetch(v => !v);
      navigate('/mytasks');
    } catch (error) {
      console.log(error);
      setstate({ loading: false, error: error.message, success: false, message: '' });
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            {state.error && <p className="text-red-600">{state.error}</p>}
            {state.success && <p className="text-green-600">{state.message}</p>}
            <AlertDialogTitle>Are you absolutely sure to delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this task and related data
              from our servers .(Only Admin and Project Admins can delete tasks)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteTaskAlert;
