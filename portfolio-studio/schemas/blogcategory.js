// schemas/overview.js
export default {
  name: 'blogcategory',
  type: 'document',
  title: 'Blog Category',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'BG Colour',
      name: 'bg_color',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
}
