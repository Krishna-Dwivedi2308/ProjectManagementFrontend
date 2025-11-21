import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrganizations } from '@/services/apiOrganization';
import OrganizationCard from '@/components/OrganizationCard';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CreateOrganization from '@/components/CreateOrganization';
const Dashboard = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        setLoading(true);
        const res = await getAllOrganizations();
        setResponse(res);
      } catch (err) {
        // console.error("Failed to fetch organizations:", err);
        setError(err.message || 'Failed to load organizations');
      } finally {
        setLoading(false);
      }
    };

    fetchOrgs();
  }, []);

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center">
        <p>Loading organizations...</p>
      </div>
    );
  }

  if (error) {
    // console.log(error);
    return (
      <div className="pt-20 flex items-center justify-center px-4">
        <span></span>

        <Card className="w-full max-w-md bg-gray-950 border border-red-700/40 shadow-lg">
          <CardHeader>
            {/* <CardTitle className="text-red-400">Something Went Wrong</CardTitle> */}
            <CardDescription className="text-gray-400">
              We did not find any organizations you created.Either create one or try again.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-red-500 text-sm">{error}</p>
          </CardContent>

          <CardFooter className="flex justify-end">
            <CreateOrganization
              trigger=<Button className="m-2 p-2 bg-green-600 hover:bg-green-500">
                Create Organization
              </Button>
            />
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const orgs = response?.data || [];

  return (
    <div className="pt-20 ">
      <div className="flex justify-end">
        <span>
          <CreateOrganization
            trigger=<Button className="m-2 p-2 bg-green-600 hover:bg-green-500">
              Create Organization
            </Button>
          />
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {orgs.map(org => (
          <OrganizationCard
            key={org._id}
            name={org.name}
            admin={org.admin}
            createdAt={org.createdAt}
            updatedAt={org.updatedAt}
            onOpenDetails={() => navigate(`/organization/${org._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
