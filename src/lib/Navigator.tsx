import { type RouteObject } from "react-router";
import App from '@/App';
import LatestPosts from "@/components/latestPosts/LatestPosts";
import Members from "@/screens/members/Members";
import Notifications from "@/screens/notifications/Notifications";
import Messages from "@/screens/messages/Messages";

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
            }

        ]
    }
];

export default routes;