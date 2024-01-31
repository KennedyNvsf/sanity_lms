import { defineField } from "sanity";
import {CreditCardIcon} from '@sanity/icons'


const purchase = {
    name: 'purchase',
    title: 'Purchase',
    type: 'document',
    icon: CreditCardIcon,
    fields: [
    defineField({
        name: 'userId',
        title: 'User ID',
        type: 'string',
    }),
    defineField({
        name: 'course',
        title: 'Course',
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
    }),
    ],
    indexes: [{ fields: ['course._ref'] }],
    unique: [{ fields: ['userId', 'course._ref'] }],
}

export default purchase;