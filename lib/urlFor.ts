import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import sanityClient from "./sanityClient";

import createImageUrlBuilder from '@sanity/image-url';


const builder = createImageUrlBuilder(sanityClient)

export const urlFor = (source: SanityImageSource) => builder.image(source);