import { defineField } from "sanity";
import {TokenIcon} from '@sanity/icons'



const stripeCostumer = {
    name: 'stripeCostumer',
    title: 'Stripe Costumer',
    type: 'document',
    icon: TokenIcon,
    fields: [
    defineField({
        name: 'userId',
        title: 'User ID',
        type: 'string',
    }),
    defineField({
        name: 'stripeCustomerId',
        title: 'Stripe Customer ID',
        type: 'string',
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
}

export default stripeCostumer;