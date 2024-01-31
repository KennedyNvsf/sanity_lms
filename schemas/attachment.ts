import { defineField } from "sanity";
import {FolderIcon} from '@sanity/icons'


const attachment = {
    name: 'attachment',
    title: 'Course Attachments',
    type: 'document',
    icon: FolderIcon,
    fields: [
      defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'url',
        title: 'Url',
        type: 'string',
      }),
      defineField({
        name: 'courseId',
        title: 'Course ID',
        type: 'reference',
        to: [{ type: 'course' }],
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
      })
    ],
    indexes: [{ name: 'courseIndex', fields: ['courseId'] }], 
}
  
export default attachment;