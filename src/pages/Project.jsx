import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fnGetProject } from '@/services/apiProject';
import { Separator } from '@radix-ui/react-separator';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const Project = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [project, setproject] = useState({});
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setloading(true);
        seterror('');
        const res = await fnGetProject(id);
        // console.log(res.data);
        setproject(res.data);
        setloading(false);
      } catch (error) {
        // console.log(error);
        seterror(error.message);
        setloading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="pt-20 px-4 flex justify-center">
      <Card className="w-full max-w-2xl  border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white text-2xl">{project.name}</CardTitle>
          <CardDescription className="text-gray-400">Detailed project information</CardDescription>
        </CardHeader>

        <Separator className="bg-gray-800" />

        <CardContent className="text-gray-300 space-y-4 mt-4">
          {/* Description */}
          <div>
            <span className="text-gray-400">Description:</span>
            <p className="mt-1">{project.description}</p>
          </div>

          {/* Organization */}
          <div>
            <span className="text-gray-400">Organization:</span>
            <p className="mt-1">{project.organization}</p>
          </div>

          {/* Admin */}
          <div>
            <span className="text-gray-400">Admin:</span>
            <p className="mt-1">{project.admin}</p>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400">Created At:</span>
              <p className="mt-1">{new Date(project.createdAt).toLocaleString()}</p>
            </div>

            <div>
              <span className="text-gray-400">Updated At:</span>
              <p className="mt-1">{new Date(project.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Project;
