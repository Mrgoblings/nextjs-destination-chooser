import React from 'react';

interface SubheadingProps {
    children: string;
    className?: string;
}

const Subheading: React.FC<SubheadingProps> = ({ children, className }) => {

    return (
        <h1 className={` italic my-3 text-2xl ${className}`}>
            {children}
        </h1>

    );
};

export default Subheading;
