export default {
  name: 'certificat',
  title: 'Certificat de Fin de Formation',
  type: 'document',
  fields: [
    {
      name: 'eleve',
      title: 'Élève titulaire',
      type: 'reference',
      to: [{ type: 'eleve' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'autoEcole',
      title: 'Auto-École de délivrance',
      type: 'reference',
      to: [{ type: 'autoEcole' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'dateEmission',
      title: 'Date d\'émission',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'certificateCode',
      title: 'Code Unique de Vérification Certificat',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'urlCertificat',
      title: 'Lien du document / PDF',
      type: 'url',
    },
    {
      name: 'status',
      title: 'Statut du Certificat',
      type: 'string',
      options: {
        list: [
          { title: 'En cours', value: 'EN_COURS' },
          { title: 'Généré', value: 'GENERE' },
          { title: 'Téléchargé', value: 'TELECHARGE' },
        ],
      },
      initialValue: 'GENERE',
    },
  ],
};
