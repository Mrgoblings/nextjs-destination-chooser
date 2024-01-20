import React from 'react';

interface HeadingProps {
    children: string;
    className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, className }) => {

    return (
        <h1 className={`text-2xl font-bold my-3 ${className}`}>
            {children}
        </h1>

    );
};

export default Heading;
