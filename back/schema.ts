import { list } from '@keystone-next/keystone';
// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
import { text, relationship, password, timestamp, select } from '@keystone-next/keystone/fields';

/* 
I want to make an app which offers the possibility of managing tasks, asigning them to different employees from their bosses. When the employee answers an assigned task, he can upload images of the job done.
*/
export const lists = {
  // Here we define the user list.
  Worker: list({
    fields: {
      name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      birthDate: timestamp({ validation: { isRequired: true } }),
      admissionDate: timestamp({ validation: { isRequired: true }, defaultValue: { kind: 'now' } }),
      phone: text({ validation: { isRequired: true } }),
      address: text({ validation: { isRequired: true } }),
      password: password({ validation: { isRequired: true } }),
      tasks: relationship({ ref: 'Task.worker', many: true }),
      role: relationship({ ref: 'Role.workers' }),
    },
  }),
  Role: list({
    fields: {
      label: text({ validation: { isRequired: true } }),
      code: text({ validation: { isRequired: true } }),
      workers: relationship({ ref: 'Worker.role', many: true }),
    },
  }),
  // Our second list is the Posts list. We've got a few more fields here
  // so we have all the info we need for displaying posts.
  Task: list({
    fields: {
      details: text({ validation: { isRequired: true } }),
      images: relationship({ ref: 'TaskImage.task', many: true }),
      creationDate: timestamp({ defaultValue: { kind: 'now' } }),
      worker: relationship({ ref: 'Worker.tasks' }),
      status: select({
        options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Assigned', value: 'assigned' },
          { label: 'Finished', value: 'finished' },
        ],
        defaultValue: 'pending',
      }),
    },
  }),
  TaskImage: list({
    fields: {
      url: text({ validation: { isRequired: true } }),
      task: relationship({ ref: 'Task.images' }),
    },
  }),
};
