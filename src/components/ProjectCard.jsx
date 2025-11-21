import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ProjectCard = ({ name, description, createdAt, updatedAt, onOpen }) => {
  return (
    <Card className="bg-gray-900 border border-gray-800 shadow-md hover:shadow-lg transition p-4">
      <CardHeader>
        <CardTitle className="text-white text-lg">{name}</CardTitle>
        <CardDescription className="text-gray-400">
          {description || 'No description provided.'}
        </CardDescription>
      </CardHeader>

      <Separator className="my-2 bg-gray-700" />

      <CardContent className="text-gray-300 text-sm space-y-1">
        <p>
          <span className="text-gray-400">Created:</span> {new Date(createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="text-gray-400">Updated:</span> {new Date(updatedAt).toLocaleDateString()}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button variant="outline" className="border-gray-700 text-gray-300" onClick={onOpen}>
          Open Project
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
