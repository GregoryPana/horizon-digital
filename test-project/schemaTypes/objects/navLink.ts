import {defineField, defineType} from 'sanity'

export const navLink = defineType({
  name: 'navLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'path',
      title: 'Path',
      type: 'string',
      description: 'Use an internal route, for example /services-pricing',
      validation: (rule) =>
        rule
          .required()
          .regex(/^\//, {name: 'slash-prefix'})
          .error('Path must start with /'),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'path',
    },
  },
})
