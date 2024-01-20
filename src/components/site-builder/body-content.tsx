import { MDXRemote } from 'next-mdx-remote/rsc'


interface BodyContentContainerProps {
    children: string;
    className?: string;
}


const BodyContent: React.FC<BodyContentContainerProps> = ({ children, className }) => {
    return (
        <div className={`my-5 text-justify p-4 border-muted-foreground border-x-2 ${className}`}>
            <p className="flex flex-col">
                <MDXRemote source={children} />
            </p>
        </div>
    );
};

export default BodyContent;

