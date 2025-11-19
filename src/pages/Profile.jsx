import React, { useEffect, useState } from 'react';
import { fngetCurrentUser, fnLogout } from '@/services/apiAuth';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import ChangePasswordDialog from '@/components/ChangePasswordDialog';
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutError, setLogoutError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const getUserTrigger = async () => {
    try {
      const res = await fngetCurrentUser();
      setUser(res.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserTrigger();
  }, []);
  const logoutTrigger = async () => {
    try {
      setLoading(true);
      const data = await fnLogout();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error(error.message);
      setLogoutError(error?.message || 'Failed to Logout');
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-6 w-6 text-white" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="pt-20 flex justify-center">
      <ChangePasswordDialog open={openDialog} onOpenChange={setOpenDialog} />
      <Card className="w-full max-w-lg bg-gray-950 border border-gray-800 shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user.avatar} alt={user.fullname} />
            <AvatarFallback>{user.fullname?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl text-white">{user.fullname}</CardTitle>
          <CardDescription className="text-gray-400">@{user.username}</CardDescription>
          <Badge variant={user.isEmailVerified ? 'default' : 'destructive'} className="mt-2">
            {user.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
          </Badge>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4 text-gray-300 mt-4">
          <div>
            <span className="text-gray-400">Email:</span>
            <p>{user.email}</p>
          </div>
          <div>
            <span className="text-gray-400">Joined:</span>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-gray-400">Last Updated:</span>
            <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button
            onClick={() => setOpenDialog(true)}
            variant="outline"
            className="border-gray-700 text-gray-300"
          >
            Change Password
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={logoutTrigger}>
            Logout
          </Button>
          {logoutError && <p className="text-red-500 text-sm mt-2">{logoutError}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
