// schemas/overview.js
export default {
  name: 'experience',
  type: 'document',
  title: 'Experience',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Company Name',
      name: 'company_name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Location',
      name: 'location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Sort Order',
      name: 'order',
      type: 'string',
    },
    {
      title: 'Background Color',
      name: 'iconBg',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Date',
      name: 'date',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    {
      name: 'points',
      title: 'Points',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
    },
  ],
}
