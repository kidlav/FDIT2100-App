import { useSuspenseQuery } from "@tanstack/react-query";
import Member from "@/components/ui/members/Member";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { fetchMembers } from "@/lib/api";
import { Input } from '@/components/ui/input';
import styles from "./membersList.module.css"
import { useMemo, useState } from "react";
import { type Member as MemberType } from "@/lib/types/member";
import { XMarkIcon } from "@heroicons/react/24/solid";



export default function MembersList() {
    const [nameFilter, setNameFilter] = useState('');

    const { data } = useSuspenseQuery({
        queryKey: ['members'],
        queryFn: () => fetchMembers(),
        staleTime: 1000 * 60 * 5,
    });

    const filteredMembers = useMemo(
        () =>
          data.users.filter((member: MemberType) => {
            const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
            const reversedName = `${member.lastName} ${member.firstName}`.toLowerCase();
            const query = nameFilter.toLowerCase().trim();

        return fullName.includes(query) || reversedName.includes(query);
        }),
        [data.users, nameFilter]
      );


    return (
        <>
            <div className="relative">
                <Input name="search-members" 
                value={nameFilter} 
                onChange={event => setNameFilter(event.target.value)} 
                placeholder="Search Members" 
                className={styles.searchField} />
                
                <MagnifyingGlassIcon className="size-5 -translate-y-8 translate-3 text-gray-400" />

                <ul className="mt-3">
                    {filteredMembers.length == 0 ? (
                        <li className=" text-gray-500">No member found 😢</li>
                    ) :
                        filteredMembers.map(user => (
                            <Member key={user.id} member={user} />
                        ))}
                    {nameFilter && (
                        <XMarkIcon
                            onClick={() => setNameFilter("")}
                            className="size-5 absolute right-5 top-3 cursor-pointer text-gray-400 hover:text-gray-600"
                        />
                    )}
                </ul>
            </div>
        </>
    );
}


{/* {data.users
                .filter(filteredMembers)
                .map(user => (
                <Member key={user.id} member={user}/>
            ))} */}


{/* {data.users.filter(filterMembers).length === 0 && (
                <p className="text-center text-2xl text-gray-500 mt-4">No member found 😢</p>
            )} */}