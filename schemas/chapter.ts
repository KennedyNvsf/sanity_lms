import { defineField } from "sanity";
import {MasterDetailIcon} from '@sanity/icons'


const chapter = {
  name: 'chapter',
  title: 'Course Chapters',
  type: 'document',
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Chapter Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Chapter Description',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Url',
      type: 'string',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'number',
    }),
    defineField({
      name: 'isPublished',
      title: 'Is Chapter published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isFree',
      title: 'Is Free',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'muxData',
      title: 'Mux Data',
      type: 'reference',
      to: [{ type: 'muxData' }],
    }),
    defineField({
      name: 'muxVideo',
      title: 'Mux Video',
      type: 'mux.video',
      validation: (Rule) => Rule.optional(),
    }),
    defineField({
      name: 'courseId',
      title: 'Course Id',
      type: 'string',
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'course' }],
    }),
    defineField({
      name: 'userProgress',
      title: 'User Progress',
      type: 'array',
      of: [{ type: 'userProgress' }],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
    defineField( {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
  ],
  indexes: [{ fields: ['course._ref'] }],
}
  
export default chapter;