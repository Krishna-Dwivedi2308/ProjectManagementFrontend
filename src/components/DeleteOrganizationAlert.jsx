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
import { deleteOrganizationById } from '@/services/apiOrganization';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function DeleteOrganizationAlert({ trigger, id }) {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    loading: false,
    error: '',
    success: false,
    message: '',
  });
  const handleDeleteOrganization = async e => {
    e?.preventDefault();
    try {
      setstate({ loading: true, error: '', success: false, message: '' });
      const response = await deleteOrganizationById(id);
      // assume succes if no exception; you can inspect res for a message
      setstate({ loading: false, error: '', success: true, message: response.message });
    } catch (error) {
      console.log(error);
      setstate({ loading: false, error: error.message, success: false, message: '' });
    } finally {
      setTimeout(() => {
        navigate('/dashboard');
        setstate({ loading: false, error: '', success: false, message: '' });
      }, 2000);
    }
  };

  //  if(state.message){
  //     return <p className="text-green-600">{state.message}</p>
  //  }

  //  if(state.error){
  //     return <p className="text-red-600">{state.error}</p>
  //  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {state.error && <p className="text-red-600">{state.error}</p>}
          {state.message && <p className="text-green-600">{state.message}</p>}
          <AlertDialogTitle>Are you absolutely sure to delete this Organization?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Organization and related
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="m-0 p-0">
            <Button className="bg-red-600 hover:bg-red-700 " onClick={handleDeleteOrganization}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
