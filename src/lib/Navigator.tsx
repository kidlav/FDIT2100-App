import { type RouteObject } from "react-router";
import App from '@/App';
import LatestPosts from "@/components/latestPosts/LatestPosts";
import Members from "@/screens/members/Members";
import Notifications from "@/screens/notifications/Notifications";
import Messages from "@/screens/messages/Messages";
import NotFound from "@/screens/notFound/NotFound";

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
            }

        ]
    }
];

export default routes;