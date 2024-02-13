export interface Post {
  id: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
    username: string;
  };
  createdAt?: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}
