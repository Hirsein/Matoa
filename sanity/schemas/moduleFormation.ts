export default {
  name: 'moduleFormation',
  title: 'Module de Formation (Théorique)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre du Module',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description du cours',
      type: 'text',
      rows: 3,
    },
    {
      name: 'ordre',
      title: 'Ordre / Position dans le parcours',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'typePermis',
      title: 'Type de Permis',
      type: 'string',
      description: 'Ex: A, B, C, D',
    },
    {
      name: 'programmePermis',
      title: 'Programme de Permis',
      type: 'reference',
      to: [{ type: 'programmePermis' }],
    },
    {
      name: 'videoUrl',
      title: 'URL de la vidéo du cours',
      type: 'url',
    },
    {
      name: 'durationSeconds',
      title: 'Durée totale de la vidéo (secondes)',
      type: 'number',
      initialValue: 300,
    },
    {
      name: 'tempsMinimumVisionnage',
      title: 'Temps minimum de visionnage requis (secondes)',
      type: 'number',
      description: 'Par exemple 240 secondes pour 80% d\'une vidéo de 300 secondes',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'scoreMinimumQuiz',
      title: 'Score minimum requis au Quiz (%)',
      type: 'number',
      initialValue: 70,
      validation: (Rule: any) => Rule.min(0).max(100),
    },
    {
      name: 'isActive',
      title: 'Module Actif',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'createdAt',
      title: 'Date de création',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
};
