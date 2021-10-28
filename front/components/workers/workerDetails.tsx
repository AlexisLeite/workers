import React, { ReactElement, useState } from 'react';
import styles from './workers.module.sass';
import { gql, useQuery } from '@apollo/client';
import { Worker, Task } from './../../types/workers';
import TaskDetails from './../tasks/taskDetails';
import { TabButton } from './../../services/tabs';
import profilePic from './perfil.png';
import Image from 'next/image';
import { MdModeEdit } from 'react-icons/md';
import SegmentedControl from '../global/controls/segmented/segmented';
import {
  EditableField,
  EditableFieldsProvider,
  useEditableFields,
  EditableFieldButtons,
} from './../../contexts/editableField';

interface WorkerDetailsProps {
  id: string;
}

function WorkerPersonalData({ worker }: { worker: Worker }) {
  const { state, dispatch } = useEditableFields();
  return (
    <table>
      <thead>
        <tr>
          <td colSpan={3}>
            <EditableFieldButtons
              Edit={<MdModeEdit />}
              onAccept={() => {
                console.log(state);
                return true;
              }}
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Image src={profilePic} alt="" />
          </td>
          <td>
            <table>
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>
                    <EditableField name="name" />
                  </td>
                </tr>
                <tr>
                  <th>Phone:</th>
                  <td>
                    <EditableField name="phone" />
                  </td>
                </tr>
                <tr>
                  <th>Address:</th>
                  <td>
                    <EditableField name="address" />
                  </td>
                </tr>
                <tr>
                  <th>Birthdate:</th>
                  <td>{new Date(worker.birthDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Employeed since:</th>
                  <td>{new Date(worker.admissionDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Role:</th>
                  <td>{worker.role.label}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function TasksList({ tasks, worker }: { worker: Worker; tasks: Task[] }) {
  return (
    <table>
      <tbody>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TabButton
              Tag="tr"
              style={{ cursor: 'pointer' }}
              key={task.id}
              content={<TaskDetails id={task.id} />}
              title={`[${worker.name
                .split(' ')
                .map((chor) => chor.slice(0, 1))
                .join('')
                .toUpperCase()}] ${task.details.slice(0, 15)}`}
              unique={task.id}
            >
              <td colSpan={6}>{task.details}</td>
            </TabButton>
          ))
        ) : (
          <tr>
            <td>Nothing to show</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

const workerDetailsQuery = gql`
  query Worker($where: WorkerWhereUniqueInput!) {
    worker(where: $where) {
      id
      name
      birthDate
      phone
      address
      admissionDate
      tasks {
        id
        details
        creationDate
        status
      }
      role {
        id
        label
        code
      }
    }
  }
`;

export default function WorkerDetails({ id }: WorkerDetailsProps): ReactElement {
  const [whichTasks, setTasks] = useState('assigned');
  const { error, data } = useQuery(workerDetailsQuery, { variables: { where: { id } } });

  if (error) return <>Something went wrong</>;
  if (data) {
    const worker: Worker = data.worker;
    const tasks = (worker.tasks || []).filter((task) => task.status === whichTasks);
    return (
      <div className={styles.WorkerDetails}>
        <EditableFieldsProvider
          fields={{
            name: { type: 'text', actualValue: worker.name },
            phone: { type: 'text', actualValue: worker.phone },
            address: { type: 'text', actualValue: worker.address },
            /* birthDate: { type: 'text', actualValue: worker.birthDate }, */
            /* admissionDate: { type: 'text', actualValue: worker.admissionDate }, */
            /* role: {type 'select', actualValue: worker.role} */
          }}
        >
          <WorkerPersonalData worker={worker} />
        </EditableFieldsProvider>
        <SegmentedControl
          options={[
            { label: 'Assigned tasks', value: 'assigned' },
            { label: 'Finished tasks', value: 'finished' },
          ]}
          onSelect={(ev) => setTasks(ev.value)}
        />
        <TasksList worker={worker} tasks={tasks} />
      </div>
    );
  } else return <>Loading...</>;
}
