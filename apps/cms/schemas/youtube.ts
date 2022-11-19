import { defineField, defineType } from "sanity";
import { Youtube } from "../components/Youtube";

export default defineType({
  name: "youtube",
  title: "Youtube Embed",
  type: "object",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTube video URL",
    }),
  ],
  preview: {
    select: {
      url: "url",
    },
  },
  components: {
    preview: Youtube,
  },
});
