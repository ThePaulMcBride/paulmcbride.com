import { defineField, defineType } from "sanity";

export default defineType({
  name: "divider",
  title: "Divider",
  type: "object",
  fields: [
    defineField({
      name: "style",
      type: "string",
      title: "Style",
      options: {
        list: ["break"],
      },
    }),
  ],
});
