import { serialize } from "next-mdx-remote/serialize";
// import { MDXRemote } from 'next-mdx-remote/rsc'

import matter from "gray-matter";


interface BodyContentContainerProps {
    children: string;
    className?: string;
}


const BodyContent: React.FC<BodyContentContainerProps> = async ({ children, className }) => {
    // const content = await serialize(children);

    // console.log(content);

    const { content, data } = matter(children);
    // const mdxSource = await serialize(content, { scope: data });

    return (
        <div className={`my-5 text-justify p-4 border-muted-foreground border-x-2 ${className}`}>
            <p className="flex flex-col">
                {children}
            </p>
        </div>
    );
};

export default BodyContent;
