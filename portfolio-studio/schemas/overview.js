// schemas/overview.js
export default {
  name: 'overview',
  type: 'document',
  title: 'Overview',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Sort Order',
      name: 'order',
      type: 'string',
    },
    {
      title: 'Icon',
      name: 'icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
}
