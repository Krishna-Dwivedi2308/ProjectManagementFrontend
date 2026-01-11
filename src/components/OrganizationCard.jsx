import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, User } from 'lucide-react';

const OrganizationCard = ({ name, admin, createdAt, updatedAt, onOpenDetails }) => {
  return (
    <Card className="w-full max-w-md bg-gray-950 border border-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white text-lg">{name}</CardTitle>
        <CardDescription className="text-gray-400">Organization Overview</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="text-gray-300 space-y-4 mt-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <p>
            <span className="text-gray-400">Created:</span>{' '}
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <p>
            <span className="text-gray-400">Updated:</span>{' '}
            {new Date(updatedAt).toLocaleDateString()}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        {onOpenDetails && (
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300"
            onClick={onOpenDetails}
          >
            View
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrganizationCard;
