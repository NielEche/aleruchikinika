// src/pages/about.js
import useContentful from '../lib/useContentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const AboutPage = () => {
    const { aboutRecord, loadingAbout } = useContentful();

    if (loadingAbout) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="text-center p-6 bg-black text-white lg:flex justify-between">
              <div className=' px-6 lg:px-4  w-full'>
                  <h1 className="text-5xl lg:text-center text-left font-bold mb-4 orpheusproMedium">Aleruchi Kinika</h1>
              </div>
              
                {/* Render the rich text content */}
                <div className='px-6 text-xl lg:px-8 w-full text-left'>
                  {aboutRecord && documentToReactComponents(aboutRecord)}
                </div>
                
            </div>
        </div>
    );
};

export default AboutPage;
