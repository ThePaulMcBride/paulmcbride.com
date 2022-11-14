const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: "ccpebaw2",
  dataset: "production",
  apiVersion: "2022-11-14",
  useCdn: true,
});

export { client };
