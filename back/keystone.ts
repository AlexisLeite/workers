/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-next/keystone';

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schema';

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from './auth';
import { Tasks, Workers } from './workers';

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
      onConnect: async ({ db }) => {
        if (process.argv.indexOf('seed') !== -1) {
          /* 
          Seed tasks
          
          const workers = (await db.Worker.findMany({})).map((worker) => worker.id);

          for (let task of Tasks) {
            task.worker = {
              connect: { id: workers[Math.floor(Math.random() * workers.length)] as string },
            };
            await db.Task.createOne({ data: task });
          } */
          /* 

          Create new users          
          
          for await (let worker of Workers) {
            try {
              await db.Worker.createOne({ data: worker });
            } catch (e) {
              console.error(`Couldn't create ${worker.name}`, e);
            }
          } */
          /* 
          
          Edit users roles
          
          const role = (await db.Role.findMany({ where: { label: { equals: 'Worker' } } }))[0].id;
          const workers = await db.Worker.findMany();
          for await (let worker of workers) {
            if (!worker.role)
              await db.Worker.updateOne({
                where: { id: worker.id },
                data: { role: { connect: { id: role } } },
              });
          } */
          /* 

          Edit tasks status

          const tasks = (await db.Task.findMany()).map((task) => task.id);
          for await (let task of tasks) {
            console.log(`Updating task with id: ${task}`);
            await db.Task.updateOne({
              where: { id: task },
              data: {
                status: 'assigned',
              },
            });
          } */
        }
      },
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    server: {
      port: 5000,
    },
    graphql: {
      cors: {
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
      },
    },
    lists,
    session,
  })
);
