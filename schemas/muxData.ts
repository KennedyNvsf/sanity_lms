import { defineField } from "sanity";
import {DocumentVideoIcon} from '@sanity/icons'



const muxData = {
    name: 'muxData',
    title: 'Mux Data',
    type: 'document',
    icon: DocumentVideoIcon,
    fields: [
    defineField({
      name: 'assetId',
      title: 'Asset ID',
      type: 'string',
    }),
    defineField({
      name: 'playbackId',
      title: 'Playback ID',
      type: 'string',
    }),
    defineField({
      name: 'chapter',
      title: 'Chapter',
      type: 'reference',
      to: [{ type: 'chapter' }],
    }),
  ],
}

export default muxData;