import React, { ReactElement } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Worker, WorkerData } from '../../types/workers';
import styles from './workers.module.sass';
import Link from 'next/link';
import WorkerDetails from './workerDetails';
import { TabButton } from './../../services/tabs';

interface WorkersWidgetProps {
  styles?: string;
}

const WorkersQuery = gql`
  query ($orderBy: [WorkerOrderByInput!]!) {
    workers(orderBy: $orderBy, take: 15) {
      id
      name
      admissionDate
    }
  }
`;

interface WorkerRowProps {
  worker: Worker;
}

function WorkerRow({ worker }: WorkerRowProps) {
  return (
    <TabButton
      key={worker.id}
      content={<WorkerDetails id={worker.id} />}
      title={worker.name}
      unique={worker.id}
      Tag="tr"
    >
      <th>
        <a>{worker.name}</a>
      </th>
      <td>
        {new Date(worker.admissionDate).toLocaleDateString(undefined, {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </td>
    </TabButton>
  );
}

export default function WorkersWidget({}: WorkersWidgetProps): ReactElement {
  const { loading, error, data } = useQuery<WorkerData>(WorkersQuery, {
    variables: {
      orderBy: [
        {
          admissionDate: 'desc',
        },
      ],
    },
  });

  let result;

  if (loading) result = <h1>Loading...</h1>;
  if (error)
    result = (
      <>
        <h1>Oops... </h1>
        <h2>There is something wrong</h2>
      </>
    );

  if (!data) result = <h1>There is nothing to show</h1>;
  else {
    result = (
      <div className="WorkersWidget">
        <table>
          <caption>Most recent workers</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Admission date</th>
            </tr>
          </thead>
          <tbody>
            {data.workers.map((worker) => (
              <WorkerRow key={worker.name} worker={worker} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className={styles.WorkersWidget!}>
      {result}
      <div>
        <Link href="/workers/all">See all...</Link>
      </div>
    </div>
  );
}
