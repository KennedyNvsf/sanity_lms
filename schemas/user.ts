import { defineField } from 'sanity';
import { UserIcon } from "@sanity/icons";

const user = {
  name: 'user',
  title: 'user',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'isTeacher',
      title: 'Is Teacher',
      type: 'boolean',
      description: 'Check if the user is a teacher',
      initialValue: false,
      validation: Rule => Rule.required(),
      //   readOnly: true,
      //   hidden: true,
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      description: 'Name of the user',
    //   readOnly: true,
    //   validation: Rule => Rule.required(),
    }),
    defineField({
        name: 'lastName',
        title: 'Last Name',
        type: 'string',
        description: 'Last name of the user',
      //   readOnly: true,
      //   validation: Rule => Rule.required(),
      }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
  ],
};

export default user;