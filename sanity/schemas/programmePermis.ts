export default {
  name: 'programmePermis',
  title: 'Programme de Permis',
  type: 'document',
  fields: [
    {
      name: 'typePermis',
      title: 'Type de Permis',
      type: 'string',
      description: 'Ex: A, B, C, D, A1, A2, BE, CE',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titreProgramme',
      title: 'Titre du Programme',
      type: 'string',
      description: 'Ex: Programme complet Permis B – voiture',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'descriptionProgramme',
      title: 'Description du Programme',
      type: 'text',
      rows: 4,
    },
    {
      name: 'modules',
      title: 'Modules associés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'moduleFormation' }] }],
    },
    {
      name: 'isActive',
      title: 'Programme Actif',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'createdAt',
      title: 'Date de Création',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'updatedAt',
      title: 'Dernière mise à jour',
      type: 'datetime',
    },
  ],
};
