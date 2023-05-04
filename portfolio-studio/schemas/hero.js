// schemas/overview.js
export default {
  name: 'hero',
  type: 'document',
  title: 'Hero',
  fields: [
    {
      title: 'Header Name',
      name: 'header_name',
      type: 'string',
    },
    {
      title: 'Icon',
      name: 'icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Developer Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Github Link',
      name: 'github',
      type: 'string',
    },
    {
      name: 'lists',
      title: 'Lists',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
    },
  ],
}
