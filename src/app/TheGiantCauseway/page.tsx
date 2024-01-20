import React from 'react';
import Title from '@/components/site-builder/title';
import Heading  from '@/components/site-builder/heading';
import BodyContent from '@/components/site-builder/body-content';
import HeadingBodyBlock from '@/components/site-builder/heading-body-block';
import Subheading from '@/components/site-builder/subheading';
import { throws } from 'assert';


const TheGiantCauseway: React.FC = () => {
    return (
        <div className='mx-5p flex justify-center flex-col bg-muted border-8 border-foreground'>
            <Title subtitle={`
                <br></br>
                ![The Giant's Causeway img](https://www.thegiantscausewaytour.com/wp-content/uploads/2019/01/The-Giants-Causeway-Story-M.jpg)
                <br></br>
                <br></br>
                Embark on a mesmerizing Irish adventure with our exclusive group travel offer from Sofia to Bushmills. Discover the enchanting Giant's Causeway and experience the warm hospitality of Ireland's stunning landscapes.
                <br></br>
                **Destination**: Bushmills, Ireland<br></br>
                **Group Size**: Minimum 15 people<br></br>
                **Suitability**: Children, adults, and individuals with disabilities<br></br>
                **Special Equipment**: Not required
                <br></br>
            `}>
                Welcome to the Giant Causeway!
            </Title>
            <HeadingBodyBlock
                heading = {`
                    What is the Giant's Causeway?
                    ![The Giant's Causeway img](https://apetcher.files.wordpress.com/2015/06/img_1141.jpg?w=200)
                `}
                body="The Giant's Causeway lies at the foot of the basalt cliffs along the sea coast on the edge of the Antrim plateau in Northern Ireland. It's renowned for its unique geological formations. The most characteristic feature of this incredible UNESCO World Heritage site is the exposure of around 40,000 massive black hexagonal basalt columns, descending gently into the sea. Geological studies of these formations over the last 300 years show that this striking landscape was formed by volcanic activity during the Tertiary, around 50-60 million years ago."
            />

            <HeadingBodyBlock
                heading="How it was formed"
                subheading='Geological history of the place'
                body={`
                    Geological studies of these formations over the last 300 years show that this striking landscape was formed by volcanic activity around 60 million years ago.
                    <br></br>
                    <br></br>
                    Half a million years of volcanic activity deposits several lava flows (the Lower Basalts). Volcanism ceases for half a million years. This period of volcanic inactivity and weathering is followed by a new phase of volcanism. Molten rock rises to fill a magma chamber beneath the surface. Magma ascends to the surface and erupts as lava. The magma chamber deflates causing the ground above to subside and creating a hollow at the surface. The erupted lava then fills the hollow.
                `}
            />

            
            <HeadingBodyBlock
                heading="Legends of the Giant's Causeway"
                subheading='The legend for the two giants'
                body={`
                    Legend has it that an Irish giant named Finn McCool created a causeway to get across the Irish Sea to face his rival, the Scottish giant Benandonner, who challenged Finn. Following their fearsome meeting, Benandonner ripped up the causeway as he fled back to Scotland, leaving what you see here today. 
                    <br></br>
                    <br></br>
                    However, a little-known fable provides an alternative version of the story. This lesser-known story was told by Causeway guides in the 1700s and early 1800s – of Finn building the Causeway for love rather than battle.
                `}
            />


            <HeadingBodyBlock
                heading="Itinerary"
                body={`
                1. **Transportation**: By plane, departing from Sofia Airport to Dublin with a transfer in Munich. Total travel time: 5 hours and 55 minutes.
                <br></br>
                2. **Landmark Visit**: Journey to the Giant's Causeway by train (20 minutes).
                <br></br>
                3. **Bus Transfer**: From Dublin to Bushmills by bus, taking 3 hours and 15 minutes.
                <br></br>
                <br></br>
                **Accommodation**: Stay at the "Finn McCools Giants Causeway hostel" in Bushmills.
                **Travel Dates**: May 22nd to May 26thGroup Size: 15 to 25 people
                `}
            />


            <HeadingBodyBlock
                heading="Prices per person"
                body={`
                    - Air tickets: BGN 582 <br></br>
                    - Giant's Causeway attraction: BGN 30.52 <br></br>
                    - Accommodation at "Finn McCools Giants Causeway hostel" for four nights: BGN 210 <br></br>
                    <br></br>
                    <br></br>
                    **Total price per person**: BGN **822.52**
                `}
            />
            

            <Heading className='text-lg mx-7 mt-12 italic'>
                Experience the beauty of Ireland with a seamless journey, comfortable accommodations, and captivating attractions. Book now for an unforgettable group adventure!
            </Heading>


            
        </div>
    );
};

export default TheGiantCauseway;
