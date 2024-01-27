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
                `}
                body="The Giant's Causeway lies at the foot of the basalt cliffs along the sea coast on the edge of the Antrim plateau in Northern Ireland. It's renowned for its unique geological formations. The most characteristic feature of this incredible UNESCO World Heritage site is the exposure of around 40,000 massive black hexagonal basalt columns, descending gently into the sea."
            />

            <Heading className='mx-auto px-30'>{`
                ![The Giant's Causeway img](http://localhost:3000/gc-2.jpg)
            `}</Heading>

            <HeadingBodyBlock
                heading="How it was formed"
                subheading='Geological history of the place'
                body={`
                    ![The Giant's Causeway img](http://localhost:3000/the_new_theory.png)
                    <br></br>‎<br></br>
                    ![The Giant's Causeway img](http://localhost:3000/formation.png)
                `}
            />
            
            <HeadingBodyBlock
                heading="Legends of the Giant's Causeway"
                subheading='The legend for the two giants'
                body={`
                    Legend has it that an Irish giant named Finn McCool created a causeway to get across the Irish Sea to face his rival, the Scottish giant Benandonner, who challenged Finn. Following their fearsome meeting, Benandonner ripped up the causeway as he fled back to Scotland, leaving what you see here today. 
                `}
            />

            <Heading className='mx-auto px-10 min-w-'>
            {`
                ![The Giant's Causeway img](http://localhost:3000/legend.jpg)
            `}
            </Heading>
            {/* <Heading className='mx-auto px-20 min-w-'>
            {`
                ![The Giant's Causeway img](http://localhost:3000/location.png)
            `}
            </Heading> */}


            <HeadingBodyBlock
                heading="Itinerary"
                body={`
                    ![The Giant's Causeway img](http://localhost:3000/location.png)
                    ‎ <br></br>‎ <br></br>‎ <br></br>
                    <br></br>
                    1. **Transportation**: By plane, departing from Sofia Airport to Dublin with a transfer in Munich. Total travel time: 5 hours and 55 minutes.
                    <br></br>
                    2. **Landmark Visit**: Journey to the Giant's Causeway by train (20 minutes).
                    <br></br>
                    3. **Bus Transfer**: From Dublin to Bushmills by bus, taking 3 hours and 15 minutes.
                    <br></br>
                    **Accommodation**: Stay at the "Finn McCools Giants Causeway hostel" in Bushmills. 
                    <br></br>
                    **Travel Dates**: May 22nd to May 26thGroup Size: 15 to 25 people
                `}
            />

            {/* <Heading className='mx-auto max-w-3xl'>
            {`
                ![The Giant's Causeway img](http://localhost:3000/money.png)
            `}
            </Heading> */}

            <HeadingBodyBlock
                heading="Prices per person"
                body={`
                    - Air tickets: BGN 582 <br></br>
                    - Giant's Causeway attraction: BGN 30.52 <br></br>
                    - Accommodation at "Finn McCools Giants Causeway hostel" for four nights: BGN 210 <br></br>
                    <br></br>
                    <br></br>
                    **Total price per person**: BGN **822.52**
                    <br></br> ‎ <br></br>
                    ![The Giant's Causeway img](https://i.travelapi.com/hotels/9000000/8280000/8272000/8271915/a42c85bb_z.jpg?impolicy=resizecrop&rw=750&ra=fit)
                `}
            />
            

            <Heading className='text-lg mx-7 mt-12 italic'>
                Experience the beauty of Ireland with a seamless journey, comfortable accommodations, and captivating attractions. Book now for an unforgettable group adventure!
            </Heading>


            
        </div>
    );
};

export default TheGiantCauseway;
