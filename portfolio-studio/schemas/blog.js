// schemas/overview.js
export default {
  name: 'blog',
  type: 'document',
  title: 'Blogs',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Sub Title',
      name: 'sub_title',
      type: 'string',
    },
    {
      title: 'Category',
      name: 'blogcategory',
      type: 'reference',
      to: [{type: 'blogcategory'}],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Featured',
      name: 'feature',
      type: 'boolean',
      default: false,
    },
    {
      title: 'Popular',
      name: 'popular',
      type: 'boolean',
      default: false,
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
        // other custom types
      ],
    },
  ],
}
