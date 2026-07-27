export default {
  name: 'autoEcole',
  title: 'Auto-École (Tenant)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom de l\'Auto-École',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'adresse',
      title: 'Adresse physique',
      type: 'string',
    },
    {
      name: 'contact',
      title: 'Informations de Contact',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Téléphone', type: 'string' },
        { name: 'email', title: 'Email de contact', type: 'string' },
      ],
    },
    {
      name: 'codeAutoEcoleUnique',
      title: 'Code Unique Auto-École',
      type: 'string',
      description: 'Format type MATOA-AE-001 (Utilisé par les élèves à la connexion)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo de l\'auto-école',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'couleursTheme',
      title: 'Couleurs du Thème (Branding)',
      type: 'object',
      fields: [
        { name: 'primaryColor', title: 'Couleur Primaire (Hex)', type: 'string', initialValue: '#2563eb' },
        { name: 'secondaryColor', title: 'Couleur Secondaire (Hex)', type: 'string', initialValue: '#059669' },
      ],
    },
    {
      name: 'slogan',
      title: 'Slogan / Message d\'accueil',
      type: 'text',
      rows: 2,
    },
    {
      name: 'isActive',
      title: 'Compte Actif (Suspension SaaS)',
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
