import { MegaphoneIcon } from '@heroicons/react/24/solid';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import styles from './header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className='flex'>
                <h1 className='mr-8'>
                    <a href="/" className={`flex text-lg/1.3 font-extrabold ${styles.navlink}`}>
                        <MegaphoneIcon className='size-6 mr-3'/> Connect                
                    </a>
                </h1>
                <nav>
                    <ul className='flex gap-10'>
                        <li><a className={`text-sm ${styles.navlink}`} href="/members">Members</a></li>
                        <li><a className={`text-sm ${styles.navlink}`} href="/notifications">Notifications</a></li>
                        <li><a className={`text-sm ${styles.navlink}`} href="/messages">Messages</a></li>
                    </ul>
                </nav>
            </div>
            <Avatar className='size-10'>
                <AvatarImage src='avatars/2.png'/>
                <AvatarFallback>MA</AvatarFallback>
            </Avatar>
        </header>
    )
}