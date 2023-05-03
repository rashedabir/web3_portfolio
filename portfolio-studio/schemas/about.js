// schemas/overview.js
export default {
  name: 'about',
  type: 'document',
  title: 'About',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
}
