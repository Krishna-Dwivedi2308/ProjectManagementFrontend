import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fnGetMyTasks } from '@/services/apiTasks';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const statusColor = {
  todo: 'bg-red-900/40 text-red-400 border border-red-800',
  in_progress: 'bg-yellow-900/40 text-yellow-400 border border-yellow-800',
  done: 'bg-green-900/40 text-green-400 border border-green-800',
};

const MyTasks = () => {
  const [tasks, settasks] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const getMyTasks = async () => {
      try {
        setloading(true);
        const res = await fnGetMyTasks();
        console.log(res.data);

        if (!mounted) return;
        // assume res.data is the tasks array
        settasks(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        if (!mounted) return;
        seterror(err?.response?.data?.message || err?.message || 'Failed to load tasks');
      } finally {
        if (mounted) setloading(false);
      }
    };

    getMyTasks();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3 text-gray-300">
          <Loader2 className="animate-spin" />
          <span>Loading your tasks...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 flex items-center justify-center px-4">
        <Card className="w-full max-w-lg bg-gray-950 border border-red-700/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-400">Unable to load tasks</CardTitle>
            <CardDescription className="text-gray-400">
              There was a problem fetching your tasks.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-red-300 text-sm">{error}</p>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-lg bg-gray-950 border border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">No Tasks Found</CardTitle>
            <CardDescription className="text-gray-400">
              You currently have no assigned tasks.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-gray-300">When tasks are assigned to you, they will appear here.</p>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl text-white font-semibold mb-6">My Tasks</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(t => {
            const status = (t.status || 'todo').toLowerCase();
            return (
              <Card
                key={t._id}
                className="bg-gray-950 border border-gray-800 shadow-md hover:shadow-lg transition"
              >
                <CardHeader className="pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-white text-lg">{t.title}</CardTitle>
                      <CardDescription className="text-gray-400 text-sm mt-1">
                        {t.description || 'No description provided.'}
                      </CardDescription>
                    </div>

                    <div className="ml-2">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${statusColor[status] || 'bg-gray-700 text-white'}`}
                      >
                        {status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <Separator className="bg-gray-800 my-3" />

                <CardContent className="text-sm text-gray-300 space-y-2">
                  <p>
                    <span className="text-gray-400">Project Name:</span>{' '}
                    <span className="text-gray-200">{t.project?.name}</span>
                  </p>

                  <p>
                    <span className="text-gray-400">Assigned By:</span>{' '}
                    <span className="text-gray-200">
                      {t.assignedBy?.fullname || '—'} ({t.assignedBy?.email || '—'}){' '}
                    </span>
                  </p>

                  <p>
                    <span className="text-gray-400">Created:</span>{' '}
                    <span className="text-gray-200">{new Date(t.createdAt).toLocaleString()}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Updated:</span>{' '}
                    <span className="text-gray-200">{new Date(t.updatedAt).toLocaleString()}</span>
                  </p>

                  <p>
                    <span className="text-gray-400">Attachments:</span>{' '}
                    <span className="text-gray-200">{(t.attachments || []).length}</span>
                  </p>
                </CardContent>

                <CardFooter className="flex justify-center items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300"
                      onClick={() => navigate(`/task/${t.project._id}/${t._id}`)}
                    >
                      View
                    </Button>
                    <Button onClick={() => navigate(`/project/${t.project._id}`)} variant="ghost">
                      Open Project
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
