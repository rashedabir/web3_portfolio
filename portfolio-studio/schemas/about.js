// schemas/overview.js
export default {
  name: 'about',
  type: 'document',
  title: 'About',
  fields: [
    {
      title: 'Currnet Status',
      name: 'current_status',
      type: 'string',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
}
