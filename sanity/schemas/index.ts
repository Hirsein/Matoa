import user from './user';
import autoEcole from './autoEcole';
import eleve from './eleve';
import moduleFormation from './moduleFormation';
import quiz from './quiz';
import progressionModule from './progressionModule';
import logActivite from './logActivite';
import certificat from './certificat';
import programmePermis from './programmePermis';

export const schemaTypes = [
  user,
  autoEcole,
  eleve,
  programmePermis,
  moduleFormation,
  quiz,
  progressionModule,
  logActivite,
  certificat,
];

export default schemaTypes;
