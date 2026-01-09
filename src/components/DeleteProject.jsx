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
import { deleteProjectById } from '@/services/apiProject.js';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const DeleteProject = ({ trigger }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

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
      const res = await deleteProjectById(id);
      // console.log(res.data);
      setstate({ loading: false, error: '', success: true, message: res.message });
      setTimeout(() => {
        navigate('/myprojects');
      }, 2000);
    } catch (error) {
      setstate({ loading: false, error: error.message, success: false, message: '' });
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            {state.message && <p className="text-green-600">{state.message}</p>}
            {state.error && <p className="text-red-600">{state.error}</p>}
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this project and related
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteProject;
