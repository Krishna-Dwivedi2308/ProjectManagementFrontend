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
import { Loader2 } from 'lucide-react';
const Dashboard = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openCreate, setopenCreate] = useState(false);
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
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3 text-gray-300">
          <Loader2 className="animate-spin" />
          <span>Loading your organizations...</span>
        </div>
      </div>
    );
  }

  if (error) {
    // console.log(error);
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <Card className="w-full max-w-lg bg-gray-950 border border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">No Organizations Found</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-gray-300">
              When you are admin of an Organization, it will appear here.
            </p>
            <p className="text-red-500 text-sm">{error}</p>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.reload()}>Retry</Button>
            <div className="flex justify-end p-2">
              <CreateOrganization open={openCreate} onOpenChange={setopenCreate} />
              <Button
                className="p-2 bg-green-600 hover:bg-green-500"
                onClick={() => setopenCreate(true)}
              >
                Create Organization
              </Button>
            </div>
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
          <CreateOrganization open={openCreate} onOpenChange={setopenCreate} />
          <Button
            className="m-2 p-2 bg-green-600 hover:bg-green-500"
            onClick={() => setopenCreate(true)}
          >
            Create Organization
          </Button>
          {/* <CreateOrganization
            trigger={<Button className="m-2 p-2 bg-green-600 hover:bg-green-500">
              Create Organization
            </Button>}
          /> */}
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
