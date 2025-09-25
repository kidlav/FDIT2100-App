interface Props {
    tag: string;

}

export default function Tag(props: Props) {
    const {tag} = props;
    return (
        <span className="bg-gray-100 text-gray-800 text-sm font-semibold mr-4 px-4 py-2 rounded-xl">
            {tag}
        </span>
    );
}