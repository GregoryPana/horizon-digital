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
      name: 'servicesPricingIntro',
      title: 'Services Pricing Intro',
      type: 'object',
      fields: [
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'subtitle', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'summary', type: 'text', rows: 4, validation: (rule) => rule.required()}),
      ],
    }),
    defineField({
      name: 'homeHero',
      title: 'Home Hero',
      type: 'object',
      fields: [
        defineField({name: 'trustBadgeText', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'headlineLines',
          title: 'Headline Lines',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          validation: (rule) => rule.min(1).required(),
        }),
        defineField({
          name: 'rotatingWords',
          title: 'Rotating Words',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          validation: (rule) => rule.min(1).required(),
        }),
        defineField({name: 'subtitle', type: 'text', rows: 3, validation: (rule) => rule.required()}),
      ],
    }),
    defineField({
      name: 'homeProblemSection',
      title: 'Home Problem Section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'closingText', type: 'string', validation: (rule) => rule.required()}),
      ],
    }),
    defineField({
      name: 'homeProblemCards',
      title: 'Home Problem Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        }),
      ],
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
