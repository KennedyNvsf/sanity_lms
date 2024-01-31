import { defineField } from "sanity";
import {TagIcon} from '@sanity/icons'



const category = {
    name: 'category',
    title: 'Category',
    type: 'document',
    icon: TagIcon,
    fields: [
      defineField({
        name: 'name',
        title: 'name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'courses',
        title: 'Courses',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'course' }] }],
      }),
      
    ],
  }
  
  export default category;