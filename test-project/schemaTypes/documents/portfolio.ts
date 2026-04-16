import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio Project',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category / Tier',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., Growth Tier, Foundation Tier',
    }),
    defineField({
      name: 'short_desc',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Live URL',
      type: 'url',
    }),
    defineField({
      name: 'cta',
      title: 'Primary CTA Text',
      type: 'string',
      initialValue: 'View live site →',
    }),
    defineField({
      name: 'reqCta',
      title: 'Secondary CTA Text',
      type: 'string',
      initialValue: 'Request similar site',
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color',
      type: 'string',
      description: 'CSS color string (e.g., rgba(10, 40, 80, 0.45))',
    }),
    defineField({
      name: 'align',
      title: 'Layout Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'cover_image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'altText', type: 'string', title: 'Alt Text'}),
      ],
    }),
    defineField({
      name: 'alt_image',
      title: 'Alternative Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File Asset',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'cover_image',
    },
  },
})
