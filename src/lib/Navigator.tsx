import { type RouteObject } from "react-router";
import App from '@/App';
import LatestPosts from "@/components/latestPosts/LatestPosts";
import Members from "@/screens/members/Members";

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
            }
        ]
    }
];

export default routes;