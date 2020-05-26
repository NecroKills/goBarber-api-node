import { container } from 'tsyringe';

import '@shared/container/providers';
import '@modules/users/providers';

// Appointments
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/Repositories/UsersRepository';

// UsersToken
// import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
// import UsersTokensRepository from '@modules/users/infra/typeorm/Repositories/UsersTokensRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
