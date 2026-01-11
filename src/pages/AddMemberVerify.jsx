import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fnVerifyInvite } from '@/services/apiProject.js';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Check, X } from 'lucide-react';

const AddMemberVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [state, setstate] = useState({
    loading: false,
    error: '',
    success: false,
    message: '',
  });

  useEffect(() => {
    let mounted = true;
    console.log('mount');

    if (!token || !email) {
      if (mounted) {
        setstate({
          loading: false,
          error: 'Invalid or missing verification link (token/email).',
          success: false,
          message: '',
        });
      }
      return;
    }

    const verifyInvite = async () => {
      try {
        let res;

        if (mounted) {
          setstate(s => ({ ...s, loading: true, error: '', message: '' }));
        }

        res = await fnVerifyInvite({ token, email });

        if (!mounted) return;

        setstate({
          loading: false,
          error: '',
          success: true,
          message: res?.data?.message || 'Invite verified successfully.',
        });

        navigate('/myprojects');
      } catch (err) {
        if (!mounted) return;

        const apiMessage =
          err?.response?.data?.message ||
          err?.message ||
          'Failed to verify invite. Please try again.';

        setstate({
          loading: false,
          error: apiMessage,
          success: false,
          message: '',
        });
      }
    };

    verifyInvite();

    return () => {
      mounted = false;
    };
  }, [token, email]);

  const handleRetry = () => {
    // clear error and re-run effect by forcing a small state change (or navigate to same URL)
    setstate(s => ({ ...s, error: '', message: '' }));
    // simplest way: reload the page to re-run useEffect with same query params
    // you can also call verify directly here if you extract it
    window.location.reload();
  };

  return (
    <div className="pt-20 px-4 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Project Invite Verification</CardTitle>
          <CardDescription>
            We are verifying the invite link for{' '}
            <span className="font-medium">{email || 'your email'}</span>.
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-2">
          {/* Loading state */}
          {state.loading && (
            <div className="flex items-center gap-3 text-gray-400">
              <Loader2 className="animate-spin" />
              <div>
                <p className="font-medium">Verifying invite...</p>
                <p className="text-sm">Please wait while we verify the invitation link.</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {!state.loading && state.error && (
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="text-red-500">
                  <X />
                </div>
                <div>
                  <p className="font-medium text-red-600">Verification failed</p>
                  <p className="text-sm text-gray-600">{state.error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success state */}
          {!state.loading && state.success && (
            <div className="flex items-start gap-3">
              <div className="text-green-500">
                <Check />
              </div>
              <div>
                <p className="font-medium text-green-600">Verified successfully</p>
                <p className="text-sm text-gray-600">
                  {state.message || 'You have been added to the project.'}
                </p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          {/* If success, give a button to go to project/dashboard */}
          {state.success ? (
            <>
              <Button variant="outline" onClick={() => navigate('/myprojects')}>
                Go to Projects
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate('/myprojects')}>
                Go to Projects
              </Button>
              <Button onClick={handleRetry} disabled={state.loading}>
                Retry
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddMemberVerify;
