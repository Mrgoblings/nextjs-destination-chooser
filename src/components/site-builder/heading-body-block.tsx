import * as React from "react";
import { useState } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import Heading from "./heading";
import BodyContent from "./body-content";
import Subheading from "./subheading";

interface HeadingBodyBlockProps {
    heading: string;
    body: string;
    subheading?: string;
}


const HeadingBodyBlock: React.FC<HeadingBodyBlockProps> = ({heading, body, subheading}) => {
  return (
    <div className="mx-10">
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <Heading>{heading}</Heading>
                </AccordionTrigger>
                <AccordionContent>
                    {subheading !== undefined && 
                    <Subheading>{subheading}</Subheading>}
                    <BodyContent>{body}</BodyContent>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  );
};

export default HeadingBodyBlock;