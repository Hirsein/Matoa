export default {
  name: 'logActivite',
  title: 'Journal d\'Activité (Audit Logs)',
  type: 'document',
  fields: [
    {
      name: 'actorUser',
      title: 'Utilisateur',
      type: 'reference',
      to: [{ type: 'user' }],
    },
    {
      name: 'actorRole',
      title: 'Rôle de l\'acteur',
      type: 'string',
      options: {
        list: ['SUPER_ADMIN', 'AUTO_ECOLE_ADMIN', 'ELEVE'],
      },
    },
    {
      name: 'autoEcole',
      title: 'Auto-École (Tenant context)',
      type: 'reference',
      to: [{ type: 'autoEcole' }],
    },
    {
      name: 'typeAction',
      title: 'Type d\'action',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description détaillée',
      type: 'text',
      rows: 2,
    },
    {
      name: 'timestamp',
      title: 'Horodatage',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'metadata',
      title: 'Métadonnées complémentaires',
      type: 'string', // JSON serialized string for flexibility
    },
  ],
};
