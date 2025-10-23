import { type RouteObject } from "react-router";
import App from '@/App';
import LatestPosts from "@/components/latestPosts/LatestPosts";
import Members from "@/screens/members/Members";
import Notifications from "@/screens/notifications/Notifications";
import Messages from "@/screens/messages/Messages";
import NotFound from "@/screens/notFound/NotFound";
import PostsByMembers from "@/screens/members/PostsByMember";
import Login from "@/screens/login/login";

const routes: RouteObject[] = [
    {
        path: '/',
        Component: App,
        children: [
            {
                index:true,
                Component: LatestPosts

            },
            {
                path: '/members',
                Component: Members
            },
            {
                path: '/members/:id/posts',
                Component: PostsByMembers
            },
            {
                path: '/notifications',
                Component: Notifications
            },
            {
                path: '/messages',
                Component: Messages
            },
            {
                path: '*',
                Component: NotFound
            },
            {
                path: '/login',
                Component: Login
            }

        ]
    }
];

export default routes;