import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import ActivityIcon from '../assets/heart.svg';
import ProfileIcon from '../assets/user.svg';
import CreateIcon from '../assets/create.svg';

export const sideBarLinks = [
    {
        icon: HomeIcon,
        route: '/',
        label: 'Home',
    },
    {
        icon: SearchIcon,
        route: '/search',
        label: 'Search',
    },
    {
        icon: CreateIcon,
        route: '/create-thread',
        label: 'Create Thread',
    },
    {
        icon: ActivityIcon,
        route: '/activity',
        label: 'Activity',
    },
    {
        icon: ProfileIcon,
        route: '/profile',
        label: 'Profile',
    },
];

//   export const profileTabs = [
//     { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
//     { value: "replies", label: "Replies", icon: "/assets/members.svg" },
//     { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
//   ];

//   export const communityTabs = [
//     { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
//     { value: "members", label: "Members", icon: "/assets/members.svg" },
//     { value: "requests", label: "Requests", icon: "/assets/request.svg" },
//   ];
