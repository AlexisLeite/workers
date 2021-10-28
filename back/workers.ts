export const Workers = [
  {
    name: 'Alexis Leite',
    phone: '099105304',
    address: 'Gregorio Sanabria 3525',
    birthDate: new Date('1991/03/01').toISOString(),
    admissionDate: new Date().toISOString(),
    password: 'AlgoPongo',
  },
  {
    name: 'Pedro Álvez',
    phone: '098751354',
    address: 'C Ma Ramírez 4512',
    birthDate: new Date('1988/01/12').toISOString(),
    admissionDate: new Date().toISOString(),
    password: 'AlgoPongo',
  },
  {
    name: 'Gustavo Medina',
    phone: '094545632',
    address: 'Av. de las Instrucciones 4513',
    birthDate: new Date('1970/05/22').toISOString(),
    admissionDate: new Date().toISOString(),
    password: 'AlgoPongo',
  },
  {
    name: 'Fabian Mendoza',
    phone: '097845123',
    address: 'Pedro Berro 2345',
    birthDate: new Date('1960/07/15').toISOString(),
    admissionDate: new Date().toISOString(),
    password: 'AlgoPongo',
  },
  {
    name: 'Joaquín Riverol',
    phone: '093145123',
    address: 'Av. a la Playa 4512',
    birthDate: new Date('1994/04/26').toISOString(),
    admissionDate: new Date().toISOString(),
    password: 'AlgoPongo',
  },
  {
    name: 'Roberto Aledaño',
    phone: '097784512',
    address: 'Av. Millán 4512',
    birthDate: new Date('1985/09/10').toISOString(),
    admissionDate: new Date().toISOString(),
    password: 'AlgoPongo',
  },
];

export interface Task {
  details: string;
  creationDate: string;
  status: 'pending' | 'assigned' | 'finished';
  worker?: any;
}

export const Tasks: Task[] = [
  {
    details: 'Se rompió el portón de la entrada',
    creationDate: new Date().toISOString(),
    status: 'pending',
  },
  {
    details: 'Portón basculante interior se tranca',
    creationDate: new Date().toISOString(),
    status: 'pending',
  },
  {
    details: 'Cambiar fotocélulas interiores',
    creationDate: new Date().toISOString(),
    status: 'pending',
  },
  {
    details: 'Realizar cotización para mantenimiento de portón corredizo',
    creationDate: new Date().toISOString(),
    status: 'pending',
  },
  {
    details: 'Cambiar EBP de portón exterior batiente',
    creationDate: new Date().toISOString(),
    status: 'pending',
  },
  {
    details: 'Realizar relevamiento de rampa para instalar bloqueo por fotocélulas',
    creationDate: new Date().toISOString(),
    status: 'pending',
  },
  {
    details: 'Rampa se tranca los días de lluvia',
    creationDate: new Date().toISOString(),
    status: 'pending',
  },
];
