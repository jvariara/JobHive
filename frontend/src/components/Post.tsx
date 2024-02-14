import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { Send } from "lucide-react";
import { formatDateString } from "@/lib/utils";

interface PostProps {
  post: Post;
}

const Post = ({ post }: PostProps) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-secondary p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${post.author.username}`}
              className="relative h-14 w-14"
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
              <h4 className="cursor-pointer text-secondary-foreground font-semibold text-lg lg:text-xl">
                {post.author.name}
              </h4>
              <h4 className="text-sm cursor-pointer text-primary lg:text-lg">
                @{post.author.username}
              </h4>
            </Link>

            <p className="mt-2 text-md text-muted-foreground lg:text-lg">{post.content}</p>

            <div
              className={`mt-5 flex flex-col gap-3 ${
                post.isComment && "mb-10"
              }`}
            >
              <div className="flex gap-6">
                {/* TODO: Like functionality */}
                <div className="flex gap-2">
                  <Heart className="cursor-pointer w-5 h-5 md:h-6 md:w-6 text-primary" />
                  <p className="text-primary">6</p>
                </div>

                <Link href={`/post/${post.id}`}>
                  <MessageCircleMore className="cursor-pointer w-5 h-5 md:h-6 md:w-6 text-primary" />
                </Link>

                {/* TODO: Share functionality */}
                <Send className="cursor-pointer w-5 h-5 md:h-6 md:w-6 text-primary" />
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
