import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrganizationById } from '@/services/apiOrganization';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { Button } from '@/components/ui/button';
import { DeleteOrganizationAlert } from '@/components/DeleteOrganizationAlert';
import UpdateOrganization from '@/components/UpdateOrganization';
import CreateProject from '@/components/CreateProject';
import ProjectCard from '@/components/ProjectCard';
const OrganizationDetails = () => {
  const { id } = useParams();
  console.log(id);

  const [org, setOrg] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrganizationById(id);
      setOrg(response.data);
    };
    fetchData();
  }, [id]);
  console.log(org);

  if (!org) return <div>Loading...</div>;

  return (
    <div className="pt-20 flex justify-center px-4">
      <Card className="w-full max-w-xl bg-gray-950 border border-gray-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">{org.organization.name}</CardTitle>
          <CardDescription className="text-gray-400">
            Organization Details & Information
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 text-gray-300 mt-2">
          <div>
            <span className="text-gray-400">Admin:</span>
            <p className="text-lg flex items-center gap-2 mt-1">
              <User className="h-4 w-4 text-gray-500" />
              {org.organization.admin.fullname}
            </p>
          </div>

          <Separator className="bg-gray-800" />

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-gray-400">Created On</p>
              <p>{new Date(org.organization.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-gray-400">Last Updated</p>
              <p>{new Date(org.organization.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <span className="flex justify-end">
            <CreateProject
              id={id}
              trigger=<Button className="m-2 p-2 bg-green-500 hover:bg-green-400 ">
                Create New Project
              </Button>
            />
          </span>
          <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {org.projects?.length > 0 ? (
              org.projects.map(project => (
                <ProjectCard
                  key={project._id}
                  name={project.name}
                  description={project.description}
                  createdAt={project.createdAt}
                  updatedAt={project.updatedAt}
                  onOpen={() => navigate(`/project/${project._id}`)}
                />
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-full">No projects available.</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 mt-2"
            onClick={() => navigate('/dashboard')}
          >
            Back
          </Button>

          <DeleteOrganizationAlert
            id={id}
            trigger={
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 p-2 mt-2 mx-2"
                onClick={() => {
                  console.log('button clicked for delete');
                }}
              >
                Delete Organization
              </Button>
            }
          />
          <UpdateOrganization
            id={id}
            trigger=<Button className="mt-2 p-2">Update Organization Name</Button>
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizationDetails;
