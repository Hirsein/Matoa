export default {
  name: 'progressionModule',
  title: 'Progression de Module par Élève',
  type: 'document',
  fields: [
    {
      name: 'eleve',
      title: 'Élève',
      type: 'reference',
      to: [{ type: 'eleve' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'module',
      title: 'Module de Formation',
      type: 'reference',
      to: [{ type: 'moduleFormation' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'videoWatchTimeSeconds',
      title: 'Temps de visionnage accumulé (secondes)',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'hasCompletedVideo',
      title: 'Vidéo vue en totalité / min validé',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'quizScore',
      title: 'Dernier Score au Quiz (%)',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'quizAttemptCount',
      title: 'Nombre de tentatives de quiz',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'isModuleValidated',
      title: 'Module entièrement Validé',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'lastActivityAt',
      title: 'Dernière activité',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
};
