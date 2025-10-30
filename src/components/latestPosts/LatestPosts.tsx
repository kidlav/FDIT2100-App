import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from '@/components/ui/button';
import styles from './latestPosts.module.css'
import PostsList from "../ui/posts/PostsList";
import { Suspense, useCallback, useContext} from "react";
import { PostsLastPageContext } from "@/lib/contexts/PostsLastPageContext";
import PostsSkeleton from "../ui/skeletons/PostsSkeleton";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import { Outlet, useNavigate } from "react-router";
import { CREATE_POST_AUTH_NOTICE } from "@/lib/constants";
import { useAppStore } from "@/lib/appStore";
import { toast } from "sonner";




export default function LatestPosts() {
    const context = useContext(PostsLastPageContext);
    if (!context) {
        throw new Error('LatestPosts must be used within a PostsPageProvider')
    }
    const { page, setPage } = context;

    const navigate = useNavigate();

    const {isAuthenticated} = useAppStore();

    const navigateAuthenticated = useCallback(() => {
        if (!isAuthenticated) {
            toast.error(CREATE_POST_AUTH_NOTICE, { position: 'top-right' });
            return;
        }
        navigate('create-post');
    }, [isAuthenticated, navigate]);

    return (
        <>
            <div className={styles.latest_posts_container}>
                <h2 className="text-4xl font-bold mb-6">
                    Latest Posts
                </h2>
                <Button className={styles.create_post_button} onClick={navigateAuthenticated}>
                    <PlusIcon className="size-6"/> Create Post
                </Button>
                <Outlet />
            </div>
            <ErrorBoundary message="Failed to load posts">
                <Suspense fallback={<PostsSkeleton />}>
                    <PostsList page={page} setPage={setPage}/>
                </Suspense >
            </ErrorBoundary>
        </>
    )
}