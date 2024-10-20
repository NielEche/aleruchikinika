import "../partials/contact.css";

export default function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center p-6 bg-black text-white lg:flex justify-between">
        <div className=' px-6 lg:px-4  w-full'>
            <h1 className="text-2xl lg:text-center text-left font-bold mb-4 orpheusproMedium">Contact</h1>
        </div>
        
          {/* Render the rich text content */}
          <div className='px-6 text-xl lg:px-8 w-full text-left orpheusproMedium'>
            <div className="py-2">
              <a href="mailto:alexiekhin@gmail.com">Email: alexiekhin@gmail.com</a>
            </div>
          
            <div className="py-2">
              <a href="https://www.instagram.com/aleruchi.kinika/" target="_blank" rel="noopener noreferrer">Instagram: aleruchi.kinika</a>
            </div>

            <div className="py-2">
              <a href="https://twitter.com/aleruchi_kinika" target="_blank" rel="noopener noreferrer">Twitter: aleruchi_kinika</a>
            </div>
            
          </div>
          
      </div>
  </div>
  );
}
