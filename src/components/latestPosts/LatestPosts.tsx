import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from '@/components/ui/button';
import styles from './latestPosts.module.css'
import PostsList from "../ui/posts/PostsList";
import { Suspense } from "react";
import PostsSkeleton from "../ui/skeletons/PostsSkeleton";
import ErrorBoundary from "@/components/errors/ErrorBoundary";



export default function LatestPosts() {
    return (
        <>
            <div className={styles.latest_posts_container}>
                <h2 className="text-4xl font-bold mb-6">
                    Latest Posts
                </h2>
                <Button className={styles.create_post_button}>
                    <PlusIcon className="size-6"/> Create Post
                </Button>
            </div>
            <ErrorBoundary message="Failed to load posts">
                <Suspense fallback={<PostsSkeleton />}>
                    <PostsList />
                </Suspense >
            </ErrorBoundary>
        </>
    )
}