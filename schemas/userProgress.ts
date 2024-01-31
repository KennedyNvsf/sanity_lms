import { defineField } from "sanity";
import {ActivityIcon} from '@sanity/icons'


const userProgress = {
    name: 'userProgress',
    title: 'User Progress',
    type: 'document',
    icon: ActivityIcon,
    fields: [
    defineField({
        name: 'userId',
        title: 'User ID',
        type: 'string',
    }),
    defineField({
        name: 'chapterId',
        title: 'Chapter ID',
        type: 'string',
    }),
    defineField({
        name: 'chapter',
        title: 'Chapter',
        type: 'reference',
        to: [{ type: 'chapter' }],
    }),
    defineField({
        name: 'isCompleted',
        title: 'Is Completed',
        type: 'boolean',
        initialValue: false,
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
    // indexes: [
    //     {
    //       name: 'chapterId_index',
    //       unique: false,
    //       serialized: true,
    //       sparse: false,
    //       internal: false,
    //       selector: 'chapterId',
    //     },
    //     {
    //       name: 'userId_chapterId_unique_index',
    //       unique: true,
    //       serialized: true,
    //       sparse: false,
    //       internal: false,
    //       selector: 'userId, chapterId',
    //     },
    // ],
}

export default userProgress;