const statuses = {
  draft: {
    title: "Draft",
    description:
      "This post is still being written. It may contain errors or be incomplete.",
    icon: "🌱",
  },
  "in progress": {
    title: "In progress",
    description:
      "This post has been published, but isn't yet complete. It still needs some polishing.",
    icon: "🌿",
  },
  "out of date": {
    title: "Out of date",
    description:
      "This post hasn't been updated in a while. I plan on working on it soon.",
    icon: "🍂",
  },
  published: {
    title: "Published",
    description: "This post is complete and ready to be read. Enjoy!",
    icon: "🌲",
  },
  archived: {
    title: "Archived",
    description:
      "This post is no longer being maintained. It may be out of date.",
    icon: "🍄",
  },
};

export default statuses;
