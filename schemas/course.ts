import { defineField } from 'sanity';
import {BookIcon} from '@sanity/icons'

const course = {
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
        name: 'userId',
        title: 'User Id',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'slug',
        type: 'slug',
        options: {
          source: 'name',
        },
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'string',
    }),
    defineField({
        name: 'imageUrl',
        title: 'Image URL',
        type: 'string',
    }),
    defineField({
        name: 'price',
        title: 'Course Price',
        type: 'number',
    }),
    defineField({
        name: 'isPublished',
        title: 'Is Course Published?',
        type: 'boolean',
    }),
    defineField({
        name: 'categoryId',
        title: 'Category ID',
        type: 'reference',
        to: [{ type: 'category' }],
    }),
    defineField({
        name: 'chapters',
        title: 'Chapters',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'chapter' }] }],
    }),
    defineField({
        name: 'attachments',
        title: 'Attachments',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'attachment' }] }],
    }),
    defineField({
        name: 'purchases',
        title: 'Purchases',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'purchase' }] }],
    }),
    defineField({
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
    }),
    defineField({
        name: 'updatedAt',
        title: 'Updated At',
        type: 'datetime',
    }),
  ],
  indexes: [{ name: 'categoryIndex', fields: ['categoryId'] }],
}

export default course;