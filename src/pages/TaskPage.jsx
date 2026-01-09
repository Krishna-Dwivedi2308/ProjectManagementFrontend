import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fnGetTaskById } from '@/services/apiTasks';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { Download, FolderArchive, Loader2, MoveLeft } from 'lucide-react';
import CreateSubtask from '@/components/CreateSubtask';
import DeleteTaskAlert from '@/components/DeleteTaskAlert';
import { fnDeleteSubTask, fnUpdateSubTask } from '@/services/apiSubTasks';

const TaskPage = () => {
  const navigate = useNavigate();
  const { taskId, projectId } = useParams();
  const [Task, setTask] = useState(null);
  const [Refetch, setRefetch] = useState(false);
  const [state, setState] = useState({
    loading: false,
    error: '',
    success: false,
    message: '',
    data: null,
  });

  useEffect(() => {
    if (!taskId) return; // no task id -> skip
    let mounted = true;

    const fetchData = async () => {
      try {
        // start loading
        if (mounted) setState(s => ({ ...s, loading: true, error: '', success: false }));

        // call API (uncomment / adjust fnGetTaskById signature if needed)
        // if your API expects both taskId and projectId, pass both; otherwise pass taskId only
        const res = await fnGetTaskById(taskId, projectId);
        console.log(res.data);
        setTask(res.data);
        // protect against updates after unmount
        if (!mounted) return;

        // use res.data (adjust depending on API shape)
        setState({
          loading: false,
          error: '',
          success: true,
          message: res?.data?.message || 'Task loaded',
          data: res?.data || res,
        });
      } catch (error) {
        if (!mounted) return;
        setState({
          loading: false,
          error: error?.message || 'Failed to load task',
          success: false,
          message: '',
          data: null,
        });
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [taskId, projectId, Refetch]);

  const handleMarkDone = async subtaskId => {
    const formdata = { isCompleted: true };
    try {
      setState({ loading: true, error: '', success: false, message: '' });
      const res = await fnUpdateSubTask(subtaskId, projectId, formdata);
      // console.log(res);
      setRefetch(v => !v);
      setState({ loading: false, error: '', success: true, message: res.message });
    } catch (error) {
      console.log(error);
      setState({ loading: false, error: error.message, success: false, message: '' });
    }
  };

  const handleDeleteSubtask = async subtaskId => {
    try {
      setState({ loading: true, error: '', success: false, message: '' });
      const res = await fnDeleteSubTask(subtaskId, projectId);
      // console.log(res);
      setRefetch(v => !v);
      setState({ loading: false, error: '', success: true, message: res.message });
    } catch (error) {
      console.log(error);
      setState({ loading: false, error: error.message, success: false, message: '' });
    }
  };
  // render UI depending on state
  if (state.loading)
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3 text-gray-300">
          <Loader2 className="animate-spin" />
          <span>Loading </span>
        </div>
      </div>
    );
  if (state.error) return <div className="pt-20 text-red-500">{state.error}</div>;
  if (!state.data) return <div className="pt-20">No task data</div>;

  return (
    <div className="pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className=" border border-gray-800 shadow-lg">
          <div>
            <Button
              variant="ghost"
              className="m-3 p-3  border border-gray-800"
              onClick={() => navigate(-1)}
            >
              {' '}
              <MoveLeft />
              Back to Tasks
            </Button>
          </div>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="mt-3">
                <CardTitle className="text-2xl text-white">{Task?.task?.title}</CardTitle>
                <CardDescription className="text-gray-400 mt-1">
                  {Task?.task?.description}
                </CardDescription>
              </div>

              <div className="flex flex-col items-end gap-2">
                {/* Status badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    (Task?.task?.status === 'todo' &&
                      'bg-red-900/40 text-red-400 border border-red-800') ||
                    (Task?.task?.status === 'in_progress' &&
                      'bg-yellow-900/40 text-yellow-400 border border-yellow-800') ||
                    (Task?.task?.status === 'blocked' &&
                      'bg-orange-900/40 text-orange-400 border border-orange-800') ||
                    'bg-green-900/40 text-green-400 border border-green-800'
                  }`}
                >
                  {(Task?.task?.status || 'todo').toUpperCase().replace(/_/g, ' ')}
                </span>

                <div className="text-xs text-gray-400">
                  <div>
                    Created:{' '}
                    <span className="text-gray-200 font-medium">
                      {Task?.task?.createdAt ? new Date(Task.task.createdAt).toLocaleString() : '-'}
                    </span>
                  </div>
                  <div>
                    Updated:{' '}
                    <span className="text-gray-200 font-medium">
                      {Task?.task?.updatedAt ? new Date(Task.task.updatedAt).toLocaleString() : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <Separator className="bg-gray-800" />

          <CardContent className="space-y-4 text-gray-300">
            {/* Project */}
            <div>
              <p className="text-sm text-gray-400">Project</p>
              <p className="text-sm text-gray-200 mt-1">{Task?.task?.project?.name || '—'}</p>
            </div>

            {/* Assigned To / By */}
            <div className="flex justify-between sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {(Task?.task?.assignedTo?.fullname || 'U').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-400">Assigned To</p>
                  <p className="text-sm text-white mt-1">
                    {Task?.task?.assignedTo?.fullname || Task?.task?.assignedTo || '—'}
                  </p>
                  <p className="text-xs text-gray-500">{Task?.task?.assignedTo?.email || ''}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {(Task?.task?.assignedBy?.fullname || 'U').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-400">Assigned By</p>
                  <p className="text-sm text-white mt-1">
                    {Task?.task?.assignedBy?.fullname || Task?.task?.assignedBy || '—'}
                  </p>
                  <p className="text-xs text-gray-500">{Task?.task?.assignedBy?.email || ''}</p>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <p className="text-sm text-gray-400 mb-2">Attachments</p>
              {Task?.task?.attachments?.length > 0 ? (
                <ul className="space-y-2">
                  {Task.task.attachments.map(att => {
                    const sizeKB = att.size ? att.size / 1024 : 0;
                    const sizeLabel =
                      sizeKB > 1024
                        ? `${(sizeKB / 1024).toFixed(2)} MB`
                        : `${sizeKB.toFixed(1)} KB`;
                    return (
                      <li
                        key={att._id}
                        className="flex items-center justify-between bg-gray-800/40 rounded p-2"
                      >
                        <div className="flex items-center gap-3">
                          <FolderArchive />
                          <div>
                            <a
                              href={att.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-gray-200 hover:underline"
                            >
                              Download attachment
                            </a>
                            <div className="text-xs text-gray-400">
                              {att.mimetype} · {sizeLabel}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={att.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-300 hover:text-white px-3 py-1 rounded bg-gray-800/30"
                          >
                            <Download />
                          </a>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500">No attachments</p>
              )}
            </div>
            {/* Create subtasks */}
            <div className="flex justify-end">
              <CreateSubtask
                projectId={projectId}
                taskId={taskId}
                setRefetch={setRefetch}
                trigger={
                  <Button className="bg-green-600 hover:bg-green-700">Create Subtask</Button>
                }
              />
            </div>

            {/* Subtasks (if any) */}

            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-3">Subtasks</p>

              {Task?.subtasks && Task.subtasks.length > 0 ? (
                <div className="grid gap-3">
                  {Task.subtasks.map(st => (
                    <div
                      key={st._id}
                      className="p-4 rounded-lg bg-gray-900/60 border border-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-900/90"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-semibold text-gray-200 truncate">
                            {st.title}
                          </p>

                          <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                              {/* Creator avatar */}
                              <div className="h-7 w-7 rounded-full bg-gray-800 flex items-center justify-center text-xs text-gray-300">
                                {st.subtaskCreatedBy?.fullname
                                  ? st.subtaskCreatedBy.fullname.charAt(0).toUpperCase()
                                  : 'U'}
                              </div>
                              <div>
                                <div className="text-xs text-gray-200">
                                  {st.subtaskCreatedBy?.fullname || 'Unknown'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {st.subtaskCreatedBy?.email || ''}
                                </div>
                              </div>
                            </div>

                            <div className="mx-2">•</div>

                            <div>
                              <div className="text-xs text-gray-400">Created</div>
                              <div className="text-xs text-gray-300">
                                {st.createdAt ? new Date(st.createdAt).toLocaleString() : '--'}
                              </div>
                            </div>

                            <div className="mx-2">•</div>

                            <div>
                              <div className="text-xs text-gray-400">Updated</div>
                              <div className="text-xs text-gray-300">
                                {st.updatedAt ? new Date(st.updatedAt).toLocaleString() : '--'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right column: status badge + actions */}
                        <div className="flex flex-col items-end gap-3">
                          <div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold   ${
                                st.isCompleted
                                  ? 'bg-green-900/40 text-green-400 border border-green-800'
                                  : 'bg-yellow-900/40 text-yellow-400 border border-yellow-800'
                              }`}
                            >
                              {st.isCompleted ? 'COMPLETED' : 'PENDING'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Placeholder action buttons — wire to handlers if needed */}
                            <Button
                              onClick={() => handleMarkDone(st._id)}
                              className="text-xs text-gray-300 bg-gray-800/30 px-2 py-1 rounded-full hover:bg-gray-800"
                            >
                              {st.isCompleted ? 'Undo' : 'Mark Done'}
                            </Button>

                            <Button
                              onClick={() => handleDeleteSubtask(st._id)}
                              className="text-xs text-gray-300  px-4 py-1 rounded-full bg-red-700 hover:bg-red-600 m-2  "
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-1">No subtasks</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-end gap-2">
            {/* to delete the current task */}
            <div className="flex items-center gap-2">
              <DeleteTaskAlert
                projectId={projectId}
                taskId={taskId}
                setRefetch={setRefetch}
                trigger={
                  <Button variant="outline" className="bg-red-600 hover:bg-red-700 m-2 ">
                    Delete Task
                  </Button>
                }
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TaskPage;
