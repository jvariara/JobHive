import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { Send } from "lucide-react";
import { formatDateString } from "@/lib/utils";

interface PostProps {
  post: Post;
  isComment?: boolean;
}

const Post = ({ post, isComment }: PostProps) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl bg-secondary p-7 ${
        isComment && "border border-b-primary"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${post.author.username}`}
              className="relative h-12 w-12"
            >
              {/* TODO: Replace with user's profile picture */}
              <Image
                src="/default_pfp.jpg"
                alt="Profile Picture"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            {/* Line under profile picture */}
            <div
              className="relative mt-px w-0.5 grow rounded-full bg-primary"
              aria-hidden="true"
            />
          </div>

          <div className="flex w-full flex-col items-start">
            <Link href={`/profile/${post.author.username}`} className="w-fit">
              <h4 className="cursor-pointer text-secondary-foreground font-semibold text-md lg:text-lg">
                {post.author.name}
              </h4>
              <h4 className="text-sm cursor-pointer text-primary lg:text-md">
                @{post.author.username}
              </h4>
            </Link>

            <p className="mt-2 text-md text-muted-foreground">{post.content}</p>

            <div className={`mt-5 flex flex-col gap-3`}>
              <div className="flex items-center gap-6">
                {/* TODO: Like functionality */}
                <div className="flex items-center gap-2">
                  <Heart className="cursor-pointer w-4 h-4 md:h-5 md:w-5 text-primary" />
                  <p className="text-primary">5</p>
                </div>

                <Link href={`/post/${post.id}`}>
                  <MessageCircleMore className="cursor-pointer w-4 h-4 md:h-5 md:w-5 text-primary" />
                </Link>

                {/* TODO: Share functionality */}
                <Send className="cursor-pointer w-4 h-4 md:h-5 md:w-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date created */}
      {post.createdAt && (
        <Link href={`/post/${post.id}`} className="mt-5 flex items-center">
          <p className="text-muted-foreground text-sm">
            {formatDateString(post.createdAt)}
          </p>
        </Link>
      )}
    </article>
  );
};

export default Post;
