// schemas/overview.js
export default {
  name: 'approach',
  type: 'document',
  title: 'Approach',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Sort Order',
      name: 'order',
      type: 'string',
    },
    {
      title: 'Heading Name',
      name: 'heading_name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Animation Speed',
      name: 'animationSpeed',
      type: 'number',
    },
    {
      title: 'Dot Size',
      name: 'dotSize',
      type: 'number',
    },
    {
      title: 'Description',
      name: 'des',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Container ClassName',
      name: 'containerClassName',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
    },
  ],
}
