import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";
import { Button } from "../ui/button";
import type { Post, PostsCacheState } from "@/lib/types/post";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import styles from "@/components/latestPosts/latestPosts.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../ui/select";
import { useState, useCallback, useEffect } from "react";
import TagChip from "./tagChip";
import { useAppStore } from "@/lib/appStore";
import { toast } from "sonner";
import { CREATE_POST_AUTH_NOTICE } from "@/lib/constants";
import { createPost } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const allTags = [
  "american",
  "classic",
  "crime",
  "english",
  "fiction",
  "french",
  "history",
  "love",
  "magical",
  "mystery",
];

const postSchema = z.object({
  title: z.string().min(1, "Title is required."),
  body: z.string().min(1, "Body is required."),
});

export default function CreatePost() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(allTags);
  const { isAuthenticated, user } = useAppStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  // Проверка авторизации
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error(CREATE_POST_AUTH_NOTICE, { position: "top-right" });
      navigate(-1);
    }
  }, [isAuthenticated, navigate]);

  // Добавление тега
  const addTag = useCallback(
    (tag: string) => {
      if (tag && !selectedTags.includes(tag)) {
        setSelectedTags([...selectedTags, tag]);
        setAvailableTags(
          availableTags.filter((availableTag) => availableTag !== tag)
        );
      }
    },
    [selectedTags, availableTags]
  );

  // Удаление тега
  const removeTag = useCallback(
    (tag: string) => {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      setAvailableTags([...availableTags, tag]);
    },
    [selectedTags, availableTags]
  );

  // Сабмит формы
  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    try {
      const newPost: Post = await createPost(
        user.id,
        user.accessToken,
        data.title,
        data.body,
        selectedTags
      );

      newPost.reactions = { likes: 0, dislikes: 0 };
      newPost.views = 0;

      queryClient.setQueryData(["posts"], (oldData?: PostsCacheState) => {
        if (!oldData || !oldData.pages?.length) {
          return {
            pageParams: [0],
            pages: [
              {
                posts: [newPost],
                total: 1,
                skip: 0,
                limit: 10,
              },
            ],
          };
        }

        const updatedPages = [...oldData.pages];
        updatedPages[0] = {
          ...updatedPages[0],
          posts: [newPost, ...updatedPages[0].posts],
        };

        return { ...oldData, pages: updatedPages };
      });

      console.log("✅ Post created:", newPost);
      toast.success("Post created successfully!", { position: "top-right" });

      form.reset();
      setSelectedTags([]);
      setAvailableTags(allTags);
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create post.", { position: "top-right" });
    }
  };

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(open) => {
        if (!open) navigate(-1);
      }}
    >
      <DialogContent className={styles.dialog}>
        <DialogDescription className="sr-only">
          Create New Post form.
        </DialogDescription>
        <DialogHeader>
          <DialogTitle className={styles.DialogTitle}>Create Post</DialogTitle>
        </DialogHeader>

        {/* ФОРМА */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormControl>
                    <Input placeholder="Post Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Body */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormControl>
                    <Textarea
                      placeholder="What's on your mind?"
                      className={styles.body}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <div className="border border-gray-300 mb-2 px-4 py-2 rounded-md">
              {selectedTags.length === 0 ? (
                <span className="text-gray-400 cursor-default">
                  Tags appear here
                </span>
              ) : (
                selectedTags.map((tag) => (
                  <TagChip key={tag} tag={tag} onDelete={removeTag} />
                ))
              )}
            </div>

            <Select onValueChange={(value) => addTag(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tags</SelectLabel>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Кнопка сабмита */}
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className={styles.create_post_button}
              >
                Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}