import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";
import { Button } from "../ui/button";
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
import { useState, useCallback } from "react";
import TagChip from "./tagChip";

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
import { useAppStore } from "@/lib/appStore";
import { toast } from "sonner";
import { CREATE_POST_AUTH_NOTICE } from "@/lib/constants";

const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required, at least 1 character long."),
  body: z
    .string()
    .min(1, "Body is required, at least 1 character long."),
});

export default function CreatePost() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(allTags);

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const navigate = useNavigate();

  const { isAuthenticated } = useAppStore();

  if (!isAuthenticated) {
    toast.error(CREATE_POST_AUTH_NOTICE, { position: "top-right" });
  }

  // ✅ Исправлено: t → availableTag
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

  const removeTag = useCallback(
    (tag: string) => {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      setAvailableTags([...availableTags, tag]);
    },
    [selectedTags, availableTags]
  );

  // ✅ функция отправки формы
  const onSubmit = (data: z.infer<typeof postSchema>) => {
    console.log("New Post:", { ...data, selectedTags });
    // здесь можно добавить fetch() для отправки поста
    form.reset(); // очистить форму
    setSelectedTags([]);
    setAvailableTags(allTags);
    navigate(-1); // закрыть модалку
  };

  return isAuthenticated && (
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

        {/* ✅ ФОРМА */}
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
                <SelectValue placeholder="Select Tag">Select tags</SelectValue>
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

            {/* ✅ Кнопка сабмита */}
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