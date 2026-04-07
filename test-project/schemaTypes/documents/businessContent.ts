import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const businessContent = defineType({
  name: 'businessContent',
  title: 'Business Content',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'trustItems',
      title: 'Trust Items',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'services',
      title: 'Service Highlights',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),
    defineField({
      name: 'projectSteps',
      title: 'Project Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({
      name: 'addOnItems',
      title: 'Add-on Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'price', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'price'}},
        }),
      ],
    }),
    defineField({
      name: 'hostingPlan',
      title: 'Hosting Plan',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'price', type: 'string'}),
        defineField({name: 'billing', type: 'string'}),
        defineField({name: 'features', type: 'array', of: [defineArrayMember({type: 'string'})]}),
        defineField({name: 'details', type: 'array', of: [defineArrayMember({type: 'string'})]}),
        defineField({name: 'note', type: 'string'}),
      ],
    }),
    defineField({
      name: 'stabilisationPlan',
      title: 'Stabilisation Plan',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'covers', type: 'array', of: [defineArrayMember({type: 'string'})]}),
        defineField({name: 'excludes', type: 'array', of: [defineArrayMember({type: 'string'})]}),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Business Content',
      subtitle: 'Reusable website copy and pricing sections',
    }),
  },
})
