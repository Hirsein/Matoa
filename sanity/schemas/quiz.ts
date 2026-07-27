export default {
  name: 'quiz',
  title: 'Quiz d\'évaluation',
  type: 'document',
  fields: [
    {
      name: 'module',
      title: 'Module de formation associés',
      type: 'reference',
      to: [{ type: 'moduleFormation' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'timerSeconds',
      title: 'Chrono du Quiz (en secondes)',
      type: 'number',
      initialValue: 900, // 15 min
    },
    {
      name: 'questions',
      title: 'Questions du Quiz',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Question',
          fields: [
            {
              name: 'questionText',
              title: 'Intitulé de la question',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'options',
              title: 'Propositions de réponses',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule: any) => Rule.min(2),
            },
            {
              name: 'correctOptionIndex',
              title: 'Index de la bonne réponse (0, 1, 2, ...)',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(0),
            },
            {
              name: 'explanation',
              title: 'Explication corrective',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    },
    {
      name: 'createdAt',
      title: 'Date de Création',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
};
