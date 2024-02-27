import React from 'react'

const Footer = () => {
  return (
    <footer className='p-6 md:px-20'>
      <p>Dikembangkan oleh <a href="http://instagram.com/figo_arbnsyh" target="_blank" rel="noopener noreferrer" className='underline font-semibold'>Figo Arbiansyah</a></p>
    </footer>
  );
}

export default React.memo(Footer);