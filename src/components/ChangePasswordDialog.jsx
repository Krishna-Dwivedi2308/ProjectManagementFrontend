import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as Yup from 'yup';
// adjust this path to
import { fnChangePassword } from '@/services/apiAuth';
import { useNavigate } from 'react-router';

const ChangePasswordDialog = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    loading: false,
    error: '',
    validationError: {},
    success: false,
    message: '',
  });

  const [formData, setformData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInput = e => {
    setformData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  const handleSubmit = async e => {
    // prevent default
    e?.preventDefault?.();
    setstate({
      loading: true,
      error: '',
      validationError: {},
      success: false,
      message: '',
    });
    const schema = Yup.object().shape({
      oldPassword: Yup.string()
        .min(6, 'Password seems too short , Please recheck !')
        .required('Old Password is required'),
      newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New Password is required'),
      confirmPassword: Yup.string().required('Please confirm your password'),
    });

    if (formData.newPassword !== formData.confirmPassword) {
      setstate({
        loading: false,
        error: 'Passwords do not match',
        validationError: {},
        success: false,
        message: '',
      });
      return;
    }
    try {
      // setting the states accordingly to start submit

      await schema.validate(
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        { abortEarly: false }
      );
      const res = await fnChangePassword(formData);
      // assuming success if control reaches here
      setstate({
        loading: false,
        error: '',
        validationError: {},
        success: true,
        message: res?.message || 'Password changed successfully!',
      });

      // navigate to /login after 2 seconds
      setTimeout(() => navigate('/auth'), 2000);
    } catch (error) {
      // console.log("inside catch blobk");
      // console.log(error);

      if (error && error.name === 'ValidationError') {
        const newError = {};
        error.inner.forEach(ve => {
          newError[ve.path] = ve.message;
        });
        // console.log(newError);

        setstate({
          loading: false,
          error: '',
          validationError: newError,
          success: false,
          message: '',
        });
        // console.log(state);
        return;
      } else {
        setstate({
          loading: false,
          error: error?.message || 'Could not change password',
          validationError: '',
          success: false,
          message: 'Somwhing went wrong',
        });
        return;
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Change Password <div className=""></div>
          </DialogTitle>
          <DialogDescription>Enter your Old Password and your New Password</DialogDescription>
        </DialogHeader>
        {state.error && <p className="text-red-500">{state.error}</p>}
        {state.success && <p className="text-green-500">{state.message}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input
              type="password"
              name="oldPassword"
              placeholder="Enter your Old Password"
              value={formData.oldPassword}
              onChange={handleInput}
              aria-label="oldPassword"
            />
            {state?.validationError?.oldPassword && (
              <p className="text-red-500">{state.validationError?.oldPassword}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              name="newPassword"
              placeholder="Enter your New Password"
              value={formData.newPassword}
              onChange={handleInput}
              aria-label="newPassword"
            />
            {state?.validationError?.newPassword && (
              <p className="text-red-500">{state.validationError?.newPassword}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Please Confirm yourPassword"
              value={formData.confirmPassword}
              onChange={handleInput}
              aria-label="confirmPassword"
            />
            {state?.validationError?.confirmPassword && (
              <p className="text-red-500">{state.validationError?.confirmPassword}</p>
            )}
          </div>

          <DialogFooter>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  onOpenChange(false);
                  setformData({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  });
                }}
                disabled={state.loading}
              >
                Cancel
              </Button>

              <Button type="submit" onClick={handleSubmit} disabled={state.loading}>
                {state.loading ? 'Sending...' : 'Submit'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
