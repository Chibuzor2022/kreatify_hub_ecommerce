import React from 'react';
import { FaInstagram as InstagramIcon, FaWhatsapp as WhatsappIcon } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <>

    
      <div className="container mx-auto text-center">
        <div className="mt-1">
          <h2 className="text-lg font-semibold">Connect with Us</h2>
           <a href="https://www.instagram.com/kreatify.hub" target="_blank" rel="noopener noreferrer">
           <InstagramIcon className="inline-block mr-1" />
            Instagram
          </a>
           <a href="https://wa.me/2347056200249" target="_blank" rel="noopener noreferrer" className="ml-4">
           <WhatsappIcon className="inline-block mr-1" />
            WhatsApp
          </a>
        </div>
        <p className="text-center text-white mt-5">&copy; {new Date().getFullYear()} Kreatify Hub. All rights reserved.</p>
      </div>
        </>
    </footer>
  );
};

export default Footer;
