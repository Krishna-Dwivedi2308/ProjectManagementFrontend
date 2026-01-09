import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Delete, NotebookPen, User as UserIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fnGetProject, fnGetProjectMembers } from '@/services/apiProject.js';
import { Separator } from '@radix-ui/react-separator';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DeleteProject from '@/components/DeleteProject';
import UpdateProject from '@/components/UpdateProject';
import MemberInvite from '@/components/MemberInvite';
import DeleteMember from '@/components/DeleteMember';
import ChangeMemberRole from '@/components/ChangeMemberRole';
import CreateOrganization from '@/components/CreateOrganization';
import { CreateTask } from '@/components/CreateTask';
import { fnGetAllTasks } from '@/services/apiTasks';
import TaskCard from '@/components/TaskCard';
import { UpdateTask } from '@/components/UpdateTask';
import { fnDeleteNotes, fnGetNotes } from '@/services/apiNotes';
import CreateNotes from '@/components/CreateNotes';

const Project = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //   console.log(id);
  const [project, setproject] = useState({});
  const [members, setMembers] = useState([]);
  const [notes, setnotes] = useState([]);
  const [Tasks, setTasks] = useState([]);
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [refetch, setrefetch] = useState(false);
  const [openInvite, setopenInvite] = useState(false);

  useEffect(() => {
    // console.log('refetch');

    const fetchProject = async () => {
      try {
        setloading(true);
        seterror('');
        const res = await fnGetProject(id);
        const members = await fnGetProjectMembers(id);
        const notes = await fnGetNotes(id);
        console.log(notes);

        // console.log(members.data);
        // console.log(res.data);
        setnotes(notes.data);
        setproject(res.data);
        setMembers(members.data);
        setloading(false);
        // setrefetch(false);
      } catch (error) {
        // console.log(error);
        seterror(error.message);
        setloading(false);
      }

      try {
        const tasks = await fnGetAllTasks(id);
        console.log(tasks.data);
        setTasks(tasks.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, [id, refetch]);

  const handleDeleteNote = async noteId => {
    try {
      await fnDeleteNotes({ noteId, id });
      setrefetch(v => !v);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error);

    return <p className=" pt-25 text-red-600">{error}</p>;
  }

  // return (
  //     <div className="flex justify-center">
  //         <div className="pt-20 px-4 flex justify-center">
  //             <Card className="w-full max-w-2xl  border-gray-800 shadow-lg">
  //                 <CardHeader>
  //                     <CardTitle className="text-white text-2xl">{project.name}</CardTitle>
  //                     <CardDescription className="text-gray-400">
  //                         Detailed project information
  //                     </CardDescription>
  //                 </CardHeader>

  //                 <Separator className="bg-gray-800" />

  //                 <CardContent className="text-gray-300 space-y-4 mt-4">
  //                     {/* Description */}
  //                     <div>
  //                         <span className="text-gray-400">Description:</span>
  //                         <p className="mt-1">{project.description}</p>
  //                     </div>

  //                     {/* Organization */}
  //                     <div>
  //                         <span className="text-gray-400">Organization:</span>
  //                         <p className="mt-1">{project.organization}</p>
  //                     </div>

  //                     {/* Admin */}
  //                     <div>
  //                         <span className="text-gray-400">Admin:</span>
  //                         <p className="mt-1">{project.admin}</p>
  //                     </div>

  //                     {/* Timestamps */}
  //                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //                         <div>
  //                             <span className="text-gray-400">Created At:</span>
  //                             <p className="mt-1">{new Date(project.createdAt).toLocaleString()}</p>
  //                         </div>

  //                         <div>
  //                             <span className="text-gray-400">Updated At:</span>
  //                             <p className="mt-1">{new Date(project.updatedAt).toLocaleString()}</p>
  //                         </div>
  //                     </div>
  //                     <div className='flex justify-end'>
  //                         {/* <CreateOrganization open={openCreate} onOpenChange={setopenCreate} /> */}
  //                         <CreateTask
  //                             members={members}
  //                             projectId={id}
  //                             trigger={
  //                                 <Button className="m-2 p-2 bg-green-600 hover:bg-green-500">
  //                                     Create Task
  //                                 </Button>

  //                             }
  //                             setrefetch={setrefetch}
  //                         />

  //                     </div>
  //                     <h2 className='text-gray-400'>All Tasks in this Project</h2>
  //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //                         {Tasks.map((task) => (
  //                             <TaskCard
  //                                 key={task._id}
  //                                 id={task._id}
  //                                 projectId={id}
  //                                 title={task.title}
  //                                 description={task.description}
  //                                 assignedTo={task.assignedTo}
  //                                 assignedBy={task.assignedBy}
  //                                 status={task.status}
  //                                 members={members}
  //                                 setrefetch={setrefetch}
  //                             />
  //                         ))}
  //                     </div>
  //                 </CardContent>

  //                 <CardFooter className="flex justify-end">
  //                     <Button
  //                         variant="outline"
  //                         className="border-gray-700 text-gray-300 hover:bg-gray-800 m-2 "
  //                         onClick={() => navigate(-1)}
  //                     >
  //                         Back
  //                     </Button>
  //                     <UpdateProject
  //                         id={id}
  //                         open={openUpdate}
  //                         onOpenChange={setOpenUpdate}
  //                         onUpdate={setrefetch}
  //                     />
  //                     <Button onClick={() => setOpenUpdate(true)}>Edit Project</Button>
  //                     <DeleteProject
  //                         trigger={
  //                             <Button variant="outline" className="bg-red-600 hover:bg-red-700 m-2 ">
  //                                 Delete Project
  //                             </Button>
  //                         }
  //                     />
  //                     {/* add members to the project */}
  //                     <MemberInvite id={id} open={openInvite} onOpenChange={setopenInvite} />
  //                     <Button onClick={() => setopenInvite(true)}>Invite Member to Project </Button>
  //                 </CardFooter>
  //             </Card>
  //         </div>
  //         {/* this card is to display all the project members */}
  //         <div className="pt-20 px-4 flex justify-center w-auto">
  //             <Card className="w-full max-w-2xl bg-gray-950 border border-gray-800 shadow-lg">
  //                 <CardHeader>
  //                     <div className="flex items-center justify-center gap-2 ">
  //                         <UserIcon className="h-5 w-5 text-gray-400" />
  //                         <CardTitle className="text-white text-2xl">Project Members</CardTitle>
  //                     </div>
  //                     <CardDescription className="text-gray-400">List of project members</CardDescription>
  //                 </CardHeader>

  //                 <CardContent className="space-y-4">
  //                     {members?.length === 0 ? (
  //                         <div className="text-gray-400">No members yet.</div>
  //                     ) : (
  //                         members.map(member => {
  //                             const key = member._id;
  //                             const fullname = member.user?.fullname || 'Unknown';
  //                             const avatarSrc = member.user?.avatar || '';
  //                             const role = (member.role || '').replace(/_/g, ' ').toUpperCase();

  //                             return (
  //                                 <div key={key} className="flex items-center gap-4">
  //                                     <Avatar className="h-12 w-12">
  //                                         {avatarSrc ? (
  //                                             <AvatarImage src={avatarSrc} alt={fullname} />
  //                                         ) : (
  //                                             <AvatarFallback>{fullname.charAt(0) || 'U'}</AvatarFallback>
  //                                         )}
  //                                     </Avatar>

  //                                     <div className="flex-1">
  //                                         {/* <span className="text-gray-400 text-xs">Member:</span> */}
  //                                         <p className="mt-1  text-white">{fullname}</p>
  //                                     </div>

  //                                     <div className="ml-4">
  //                                         <Badge className="uppercase text-xs px-3 py-1">{role || 'MEMBER'}</Badge>
  //                                     </div>
  //                                     <div>
  //                                         <DeleteMember
  //                                             member={member}
  //                                             trigger={
  //                                                 <Button
  //                                                     variant="outline"
  //                                                     className="border-gray-700 text-gray-300 hover:bg-gray-800  "
  //                                                 >
  //                                                     Remove
  //                                                 </Button>
  //                                             }
  //                                             setrefetch={setrefetch}
  //                                         />
  //                                     </div>
  //                                     <div>
  //                                         <ChangeMemberRole
  //                                             member={member}
  //                                             trigger={
  //                                                 <Button
  //                                                     variant="outline"
  //                                                     className="border-gray-700 text-gray-300 hover:bg-gray-800  "
  //                                                 >
  //                                                     Change Role
  //                                                 </Button>
  //                                             }
  //                                             setrefetch={setrefetch}
  //                                         />
  //                                         {/* <Button
  //                                             onClick={() => setopenChangeRole(true)}
  //                                             className='bg-blue-600 text-gray-300 hover:bg-blue-200 hover:text-black'
  //                                         >Change Role
  //                                         </Button> */}
  //                                     </div>
  //                                 </div>
  //                             );
  //                         })
  //                     )}
  //                 </CardContent>
  //             </Card>
  //         </div>
  //         {/* This card is to display notes  */}
  //         <div className="pt-20 px-4 flex justify-center w-100 ">
  //             <Card className="w-full max-w-2xl bg-gray-950 border border-gray-800 shadow-lg">
  //                 <CardHeader>
  //                     <div className="flex items-center justify-center gap-2 ">
  //                         <NotebookPen className="h-5 w-5 text-gray-400" />
  //                         <CardTitle className="text-white text-2xl">Project Notes</CardTitle>
  //                     </div>
  //                     <CardDescription className="text-gray-400">All the project notes appear here </CardDescription>
  //                 </CardHeader>
  //                 <CardContent className="space-y-4">
  //                     {notes.length === 0 ? (
  //                         <div className="text-gray-400">No notes yet.</div>
  //                     ) : (
  //                         notes.map(note => (
  //                             <div key={note._id} className="flex items-center gap-4">
  //                                 <div className="flex-1">
  //                                     <span className="text-gray-400 text-xs">Note:</span>
  //                                     <p className="mt-1 text-white">{note.note}</p>
  //                                 </div>
  //                             </div>
  //                         ))
  //                     )
  //                     }
  //                 </CardContent>
  //             </Card>
  //         </div>
  //     </div>
  // );

  return (
    <div className="pt-20 flex gap-6 w-full justify-center">
      {/* LEFT: Project Details (spans two columns and two rows on large screens -> full height) */}
      <div className="flex justify-center w-full lg:col-span-2 lg:row-span-2">
        <Card className="w-full max-w-2xl border-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white text-2xl">{project.name}</CardTitle>
            <CardDescription className="text-gray-400">
              Detailed project information
            </CardDescription>
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

            {/* Create Task Button */}
            <div className="flex justify-end">
              <CreateTask
                members={members}
                projectId={id}
                trigger={
                  <Button className="m-2 p-2 bg-green-600 hover:bg-green-500">Create Task</Button>
                }
                setrefetch={setrefetch}
              />
            </div>

            {/* Tasks */}
            <h2 className="text-gray-400">All Tasks in this Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Tasks.map(task => (
                <TaskCard
                  key={task._id}
                  id={task._id}
                  projectId={id}
                  title={task.title}
                  description={task.description}
                  assignedTo={task.assignedTo}
                  assignedBy={task.assignedBy}
                  status={task.status}
                  members={members}
                  setrefetch={setrefetch}
                />
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 m-2"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>

            <UpdateProject
              id={id}
              open={openUpdate}
              onOpenChange={setOpenUpdate}
              onUpdate={setrefetch}
            />

            <Button onClick={() => setOpenUpdate(true)}>Edit Project</Button>

            <DeleteProject
              trigger={
                <Button variant="outline" className="bg-red-600 hover:bg-red-700 m-2">
                  Delete Project
                </Button>
              }
            />

            <MemberInvite id={id} open={openInvite} onOpenChange={setopenInvite} />

            <Button onClick={() => setopenInvite(true)}>Invite Member to Project</Button>
          </CardFooter>
        </Card>
      </div>

      {/* members and project notes  */}
      <div className=" justify-center w-153 lg:col-start-3 lg:row-start-1">
        <Card className="w-full max-w-2xl bg-gray-950 border border-gray-800 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <UserIcon className="h-5 w-5 text-gray-400" />
              <CardTitle className="text-white text-2xl">Project Members</CardTitle>
            </div>
            <CardDescription className="text-gray-400">List of project members</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {members?.length === 0 ? (
              <div className="text-gray-400">No members yet.</div>
            ) : (
              members.map(member => {
                const key = member._id;
                const fullname = member.user?.fullname || 'Unknown';
                const avatarSrc = member.user?.avatar || '';
                const role = (member.role || '').replace(/_/g, ' ').toUpperCase();

                return (
                  <div key={key} className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      {avatarSrc ? (
                        <AvatarImage src={avatarSrc} alt={fullname} />
                      ) : (
                        <AvatarFallback>{fullname.charAt(0) || 'U'}</AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex-1">
                      <p className="mt-1 text-white">{fullname}</p>
                    </div>

                    <Badge className="uppercase text-xs px-3 py-1">{role}</Badge>

                    <DeleteMember
                      member={member}
                      trigger={
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          Remove
                        </Button>
                      }
                      setrefetch={setrefetch}
                    />

                    <ChangeMemberRole
                      member={member}
                      trigger={
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          Change Role
                        </Button>
                      }
                      setrefetch={setrefetch}
                    />
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* : Notes Card  */}
        <div className="mt-4 flex justify-center w-153 lg:col-start-3 lg:row-start-2">
          <Card className="w-full max-w-2xl bg-gray-950 border border-gray-800 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-center gap-2">
                <NotebookPen className="h-5 w-5 text-gray-400" />
                <CardTitle className="text-white text-2xl">Project Notes</CardTitle>
              </div>
              <CardDescription className="text-gray-400">
                All the project notes appear here
              </CardDescription>
            </CardHeader>
            {/* button to add notes  */}
            <div className="flex justify-end">
              <CreateNotes
                setrefetch={setrefetch}
                projectId={id}
                trigger={<Button className="mx-4 p-2 w-30">Add Notes</Button>}
              />
            </div>

            <CardContent className="space-y-4">
              {/* Sticky-note style notes */}
              {notes.length === 0 ? (
                <div className="text-gray-400">No notes yet.</div>
              ) : (
                <div className="flex flex-wrap gap-4 ">
                  {(notes || []).map((note, idx) => {
                    // small palette set; add/remove palettes as you like
                    const palettes = [
                      { bg: 'bg-yellow-100', text: 'text-black font-bold' },
                      { bg: 'bg-pink-100', text: 'text-black font-bold' },
                      { bg: 'bg-green-50', text: 'text-black font-bold' },
                      { bg: 'bg-amber-100', text: 'text-black font-bold' },
                      { bg: 'bg-indigo-50', text: 'text-black font-bold' },
                      { bg: 'bg-rose-50', text: 'text-black font-bold' },
                    ];

                    // choose a palette pseudo-randomly so there's variety each render
                    const palette =
                      palettes[
                        (idx + Math.floor(Math.random() * palettes.length)) % palettes.length
                      ];

                    return (
                      <article
                        key={note._id}
                        className={`w-44 min-h-[5.5rem] p-3 rounded shadow-md transform  ${palette.bg} ${palette.text} break-words`}
                        style={{
                          boxShadow: '0 6px 14px rgba(2,6,23,0.45)',
                          lineHeight: 1.25,
                        }}
                      >
                        {/* MAIN CONTENT  */}
                        <div className="text-sm font-medium leading-snug whitespace-pre-wrap">
                          {note.content}
                        </div>

                        {/* meta - de-emphasized */}
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                              <span className="text-[10px] opacity-70 leading-tight">
                                {note.createdBy?.fullname || 'Unknown'}
                              </span>
                              <span className="text-[9px] opacity-60 -mt-0.5">
                                @{note.createdBy?.username || ''}
                              </span>
                            </div>
                          </div>

                          <div className="text-[10px] opacity-50 text-right">
                            {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ''}
                            <div className="text-[9px]">
                              {note.createdAt
                                ? new Date(note.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : ''}
                            </div>
                          </div>
                        </div>
                        <div>
                          <Button
                            variant="destructive"
                            className="mt-2 p-2 w-auto h-6 text-xs border-gray-700 text-gray-300 hover:bg-red-500"
                            onClick={() => handleDeleteNote(note._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Project;
