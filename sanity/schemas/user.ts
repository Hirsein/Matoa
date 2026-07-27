export default {
  name: 'user',
  title: 'Utilisateur',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Adresse Email / Identifiant',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Rôle Utilisateur',
      type: 'string',
      options: {
        list: [
          { title: 'Super Admin Matoa', value: 'SUPER_ADMIN' },
          { title: 'Admin Auto-École', value: 'AUTO_ECOLE_ADMIN' },
          { title: 'Élève', value: 'ELEVE' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'passwordHash',
      title: 'Mot de passe (Hash)',
      type: 'string',
      hidden: true,
    },
    {
      name: 'autoEcole',
      title: 'Auto-École de rattachement',
      type: 'reference',
      to: [{ type: 'autoEcole' }],
      description: 'Obligatoire si le rôle est Auto-école ou Élève (Multi-Tenant Tenant ID)',
    },
    {
      name: 'isActive',
      title: 'Compte Actif',
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
      title: 'Dernière Mise à jour',
      type: 'datetime',
    },
  ],
};
