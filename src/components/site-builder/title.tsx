import React from 'react';

import { MDXRemote } from 'next-mdx-remote/rsc'

interface TitleProps {
    children: string;
    subtitle?: string;
}

const Title: React.FC<TitleProps> = ({ children, subtitle }) => {
    return (<>
            <h1 className="text-center mt-20 text-6xl">
                <MDXRemote source={children} />
            </h1>
            <p className='mx-10p text-justify mb-12 mt-10'>
                {subtitle !== undefined && <MDXRemote source={subtitle} />}
            </p>
        </>
    );
};

export default Title;
