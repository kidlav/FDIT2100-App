import styles from '@/components/ui/posts/postsList.module.css';

interface Props {
    tag: string;

}

export default function Tag(props: Props) {
    const {tag} = props;
    return (
        <span className={styles.spanTag}>
            {tag}
        </span>
    );
}