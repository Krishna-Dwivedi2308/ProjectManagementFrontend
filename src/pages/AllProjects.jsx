import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fnGetAllProjects } from '@/services/apiProject';
import { Separator } from '@radix-ui/react-separator';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const AllProjects = () => {
  const navigate = useNavigate();
  const [projects, setprojects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fnGetAllProjects();
        // window.location.reload();
        // console.log(response.data);
        setprojects(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        // console.log(error);
      }
    };
    fetchProjects();
  }, []);

  if (error) {
    return <p>{error.message}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pt-20 px-4">
      <h1 className="text-2xl font-semibold text-white mb-6">All Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <Card
            key={project._id}
            className=" border border-gray-800 shadow-md hover:shadow-lg transition"
          >
            <CardHeader>
              <CardTitle className="text-white text-lg">{project.name}</CardTitle>
              <CardDescription className="text-gray-400">{project.description}</CardDescription>
            </CardHeader>

            <Separator className="bg-gray-800" />

            <CardContent className="text-sm text-gray-300 space-y-2 mt-3">
              <p>
                <span className="text-gray-400">Organization:</span> {project.organization.name}
              </p>
              <p>
                <span className="text-gray-400">Admin:</span> {project.admin.fullname}
              </p>

              <p>
                <span className="text-gray-400">Created:</span>{' '}
                {new Date(project.createdAt).toLocaleString()}
              </p>

              <p>
                <span className="text-gray-400">Updated:</span>{' '}
                {new Date(project.updatedAt).toLocaleString()}
              </p>
              <p>
                {project.projectAdmins.length > 0
                  ? 'Project Admins Here'
                  : 'No Project Admins assigned yet'}
              </p>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => navigate(`/project/${project._id}`)}
              >
                Open Project
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
