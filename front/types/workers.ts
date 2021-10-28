export interface Worker {
  id: string;
  name: string;
  birthDate: Date;
  phone: string;
  address: string;
  admissionDate: Date;
  tasks?: Task[];
  role: Role;
  /*     tasks: relationship({ ref: 'Task.worker', many: true }),
      role: relationship({ ref: 'Role.workers' }), */
}

export interface WorkerData {
  workers: Worker[];
}

export interface Role {
  id: string;
  label: string;
  code: string;
  workers?: Worker[];
}

export interface RoleData {
  Role: Role[];
}

export interface Task {
  id: string;
  details: string;
  /* images: relationship({ ref: 'TaskImage.task', many: true }), */
  creationDate: Date;
  worker: Worker;
  status: 'pending' | 'assigned' | 'finished';
}

export interface TaskData {
  Task: Task[];
}
