import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold mb-4 text-foreground">About Us</h1>
                <p className="text-lg text-input-foreground">
                    Welcome to our website! We are a team of passionate travelers who love exploring new destinations and sharing our experiences with others.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
