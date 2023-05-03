// schemas/skill.js
export default {
  name: 'testimonials',
  type: 'document',
  title: 'Testimonials',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Testimonial',
      name: 'testimonial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Designation',
      name: 'designation',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Company',
      name: 'company',
      type: 'string',
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
  ],
}
