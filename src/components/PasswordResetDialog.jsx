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
import { fnPasswordReset } from '@/services/apiAuth';
// adjust this path to where your API helpers live

const PasswordResetDialog = ({ open, onOpenChange }) => {
  const [formData, setformData] = useState({ email: '' });
  const [state, setstate] = useState({
    loading: false,
    error: '',
    validationError: '',
    success: false,
    message: '',
  });

  const sendPasswordResetTrigger = async () => {
    try {
      const res = await fnPasswordReset(formData);
    } catch (error) {
      setstate({
        success: false,
        error: error.message || 'Send failed',
        message: 'Mail could not be sent. Please try again.',
      });
    }
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setformData(prev => ({ ...prev, [name]: value }));
    // clear related errors and states on change
    setstate({
      loading: false,
      error: '',
      validationError: '',
      success: false,
      message: '',
    });
  };
  const handleSend = async e => {
    e?.preventDefault();
    // set loading as true on form submit
    setstate({
      loading: true,
      error: '',
      success: false,
      message: '',
    });
    try {
      const schema = Yup.object().shape({
        email: Yup.string().trim().email('Invalid email').required('Email is required'),
      });

      await schema.validate(formData, { abortEarly: false });
      await sendPasswordResetTrigger();

      // set loading to false and success to true on successful form submission
      setstate(prev => ({
        ...prev,
        loading: false,
        success: true,
        message: 'Mail has been sent to your email. Please check your inbox.',
      }));
    } catch (err) {
      // to catch the validation error from Yup and set loading to false
      console.log(err);
      if (err.name === 'ValidationError' && err.inner) {
        const newErrors = {};
        err.inner.forEach(ve => {
          // console.log(ve.path);
          // console.log(ve.message);

          if (ve.path) newErrors[ve.path] = ve.message;
        });
        setstate(prev => ({ ...prev, validationError: newErrors }));
      } else {
        setstate(prev => ({ ...prev, validationErrorerror: newErrors || 'Validation failed' }));
      }
      setstate(prev => ({ ...prev, loading: false }));
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Forgot your password? No problem, we’ve got you <div className=""></div>
          </DialogTitle>
          <DialogDescription>Enter your email to receive a password reset link.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSend} className="space-y-3">
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInput}
              aria-label="Email"
            />
            {state?.validationError?.email && (
              <p className="text-red-500 text-sm mt-1">{state?.validationError?.email}</p>
            )}
          </div>

          {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
          {state.success && <p className="text-green-600 text-sm">{state.success}</p>}

          <DialogFooter>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={state.loading}
              >
                Cancel
              </Button>

              <Button type="submit" onClick={handleSend} disabled={state.loading}>
                {state.loading ? 'Sending...' : 'Send Email'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordResetDialog;
