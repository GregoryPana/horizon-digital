import {defineArrayMember, defineField, defineType} from 'sanity'

export const insightSection = defineType({
  name: 'insightSection',
  title: 'Insight Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 3})],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subBody',
      title: 'Subheading Body',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
  },
})
