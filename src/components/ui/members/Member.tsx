import {Button} from '@/components/ui/button';
import { type Member } from '@/lib/types/member';
import styles from "@/components/ui/members/member.module.css"
import { useNavigate } from 'react-router';

interface Props {
    member: Member;
    
}

export default function Member(props: Props) {
    const {member} = props;
    const navigate = useNavigate();

    return(
        <li key={member.id} className=' flex mb-8'>
            <div className=' mr-4 mb-8'>
                <h3 className='mb-1 text-lg font-semibold'>
                    {`${member.firstName} ${member.lastName}`}
                </h3>
                <p className={styles.memberBio}>
                    {`${member.address.city}, ${member.address.country} | ${member.company.name} | ${member.company.title}`} 
                </p>
                <img src={`/avatars/${member.id}.png`} alt={`${member.firstName} ${member.lastName}'s avatar`} className='block md:hidden aspect-[7/5] h-42 object-cover ml-[30%] rounded-lg'></img>
                <Button className={styles.viewPostsButton} onClick={() => navigate(`/members/${member.id}/posts`)}>View Posts</Button>
            </div>
            <img src={`/avatars/${member.id}.png`} alt={`${member.firstName} ${member.lastName}'s avatar`} className='hidden md:block aspect-[7/4] h-42 object-cover ml-auto rounded-lg'></img>

        </li>
    );
}