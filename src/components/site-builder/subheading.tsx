import React from 'react';

import { MDXRemote } from 'next-mdx-remote/rsc'

interface SubheadingProps {
    children: string;
    className?: string;
}

const Subheading: React.FC<SubheadingProps> = ({ children, className }) => {
    return (
        <h1 className={` italic my-3 text-2xl ${className}`}>
            <MDXRemote source={children} />
        </h1>

    );
};

export default Subheading;
