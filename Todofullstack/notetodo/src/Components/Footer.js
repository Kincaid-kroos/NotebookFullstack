import React from 'react'

const Footer = () => {

const timeline = new Date().getFullYear();    
  return (
    <div>
        <footer className='text-center text-dark'>Copyright@{timeline}: All rights reserved</footer>
    </div>
  )
}

export default Footer