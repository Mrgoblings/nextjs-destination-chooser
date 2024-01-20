import React from 'react';

import { MDXRemote } from 'next-mdx-remote/rsc'

interface HeadingProps {
    children: string;
    className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, className }) => {
    return (
        <h1 className={`text-2xl font-bold my-3 flex flex-col  ${className}`}>
            <MDXRemote source={children} />
        </h1>

    );
};

export default Heading;
