export const signedInNavbarLinks = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/search",
    label: "Search",
  },
  {
    route: "/jobs",
    label: "Jobs",
  },
];

export const signedOutNavbarLinks = [
  {
    route: "/sign-in",
    label: "Sign In",
  },
  {
    route: "/sign-up",
    label: "Create Account",
  },
];

export const profileTabs = [
  { value: "posts", label: "Posts" },
  { value: "applied_jobs", label: "Applied Jobs" },
  { value: "saved_jobs", label: "Saved Jobs" },
];

export const samplePosts = [
  {
    id: "1",
    parentId: null,
    content: "Anyone hiring for frontend developers?",
    author: {
      name: "Justin",
      image: "",
      id: "1",
      username: "Justin"
    },
    createdAt: "2024-02-11 00:03:52",
    comments: [],
  },
  {
    id: "2",
    parentId: null,
    content: "Just got an offer from nvidia!!",
    author: {
      name: "Patrick M",
      image: "",
      id: "2",
      username: "patrick"
    },
    createdAt: "2024-02-11 00:03:52",
    comments: [],
  },
]