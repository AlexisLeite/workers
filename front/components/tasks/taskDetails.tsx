import React, { ReactElement } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Task } from './../../types/workers';

interface TaskDetailsProps {
  id: string;
}

const TaskDetailsQuery = gql`
  query Query($where: TaskWhereUniqueInput!) {
    task(where: $where) {
      details
      worker {
        name
      }
    }
  }
`;

export default function TaskDetails({ id }: TaskDetailsProps): ReactElement {
  const { error, data } = useQuery(TaskDetailsQuery, { variables: { where: { id } } });

  if (error) return <>Something went wrong</>;
  if (data) {
    const task: Task = data.task;
    return <div>{task.details}</div>;
  }
  return <>Loading...</>;
}
