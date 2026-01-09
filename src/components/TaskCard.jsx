import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { Badge } from './ui/badge';
import { UpdateTask } from './UpdateTask';

const TaskCard = ({
  id,
  title,
  description,
  assignedTo,
  assignedBy,
  status,
  projectId,
  members,
  setrefetch,
}) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 rounded-lg shadow-md  border bg-black border-gray-700">
      <div className="flex  justify-end align-middle gap-1">
        {/* <p className="text-gray-400 text-sm font-medium">Status:</p> */}
        <Badge
          className={`px-3 py-1 rounded-full text-xs font-semibold
      ${
        status === 'todo'
          ? 'bg-red-900/40 text-red-400 border border-red-800'
          : status === 'in_progress'
            ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-800'
            : status === 'blocked'
              ? 'bg-orange-900/40 text-orange-400 border border-orange-800'
              : 'bg-green-900/40 text-green-400 border border-green-800'
      }`}
        >
          {status.toUpperCase().replace('_', ' ')}
        </Badge>
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-400 mt-1">{description}</p>

      <div className="mt-3 text-sm text-gray-300">
        <p>
          <strong>Assigned To:</strong> {assignedTo?.fullname || 'Unknown'}
        </p>
        <p>
          <strong>Assigned By:</strong> {assignedBy?.fullname || 'Unknown'}
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="text-sm mt-4 py-0 mx-2"
          onClick={() => navigate(`/task/${projectId}/${id}`)}
        >
          View
        </Button>
        <UpdateTask
          taskId={id}
          members={members}
          projectId={projectId}
          trigger={<Button className="text-sm mt-4 px-4 py-0">Edit</Button>}
          setrefetch={setrefetch}
        />
      </div>
    </div>
  );
};

export default TaskCard;
