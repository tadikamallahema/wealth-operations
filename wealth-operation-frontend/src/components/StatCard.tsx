/* type Props = {
    title: string;
    value: string;
};

export default function StatCard({
    title,
    value
}: Props) {

    return (

        <div
            className="
                bg-white
                p-6
                rounded-2xl
                shadow-sm
            "
        >

            <h3 className="text-gray-500">
                {title}
            </h3>

            <h1 className="text-4xl font-bold mt-4">
                {value}
            </h1>

        </div>
    );
} */
type StatCardProps = {
    title: string;
    value: string;
};

export default function StatCard({ title, value }: StatCardProps) {

    return (
        <div className='bg-white p-5 rounded-2xl shadow-sm'>
            <h4 className='text-gray-500'>{title}</h4>
            <h2 className='text-3xl font-bold mt-3'>{value}</h2>
        </div>
    );
}