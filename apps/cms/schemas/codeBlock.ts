import { defineField, defineType } from "sanity";

export default defineType({
  name: "codeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "code",
      options: {
        theme: "github",
        darkTheme: "terminal",
        languageAlternatives: [
          { title: "Javascript", value: "js" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
        ],
      },
    }),
  ],
});
