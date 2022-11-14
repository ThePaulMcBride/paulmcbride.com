import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { codeInput } from "@sanity/code-input";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "PaulMcBride.com",

  projectId: "ccpebaw2",
  dataset: "production",

  plugins: [deskTool(), codeInput(), media()],

  schema: {
    types: schemaTypes,
  },
});
