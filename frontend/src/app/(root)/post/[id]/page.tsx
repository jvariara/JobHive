"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Post from "@/components/Post";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { samplePosts } from "@/constants";
import { useUser } from "@/context/UserContext";
import { CommentValidation } from "@/lib/validations/post-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Page = ({ params }: { params: { id: string } }) => {
  // @ts-ignore
  const { user } = useUser();

  const post = samplePosts[0];

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      post: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    // Send comment as a post to backend

    form.reset();
  };

  return (
    <MaxWidthWrapper>
      <div className="my-8 flex flex-col">
        <Post post={post} />

        <div aria-hidden="true" className="h-px bg-primary my-6" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-4 p-6 max-sm:flex-col bg-secondary rounded-xl"
          >
            <FormField
              control={form.control}
              name="post"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 w-full">
                  <FormLabel>
                    {/* TODO: replace with profile picture */}
                    <Image
                      src="/default_pfp.jpg"
                      alt="profile picture"
                      className="object-contain aspect-square object-center rounded-full"
                      width={48}
                      height={48}
                    />
                  </FormLabel>
                  <FormControl className="border-none bg-secondary">
                    <Input
                      type="text"
                      placeholder="Comment..."
                      className="no-focus text-secondary-foreground outline-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="rounded-3xl bg-primary px-8 py-2 text-base text-primary-foreground max-sm:w-full"
            >
              Reply
            </Button>
          </form>
        </Form>

        <div aria-hidden="true" className="h-px bg-primary my-6" />

        {/* Comments */}
        <div className="flex flex-col gap-y-4">
            {samplePosts.map((post) => (
                <Post post={post} isComment />
            ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
