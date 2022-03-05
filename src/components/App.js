import '../App.css';
import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import theme from './ui/Theme';
import Header from './ui/Header';
import Footer from './ui/Footer';
import LandingPage from './LandingPage';
import Services from './Services';
import CustomSoftware from './CustomSoftware';
import MobileApps from './MobileApps';
import Websites from './Websites';

function App() {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);


  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header 
          value={value} 
          setValue={setValue} 
          selectedIndex={selectedIndex} 
          setSelectedIndex={setSelectedIndex} 
        />
        <Routes>
          <Route exact path="/" element={
            <LandingPage setValue={setValue} setSelectedIndex={setSelectedIndex} />} 
          />
          <Route exact path="/services" element={
            <Services setValue={setValue} setSelectedIndex={setSelectedIndex} />} 
          />
          <Route exact path="/customsoftware" element={
            <CustomSoftware setValue={setValue} setSelectedIndex={setSelectedIndex} />} 
          />
          <Route exact path="/mobileapps" element={
            <MobileApps setValue={setValue} setSelectedIndex={setSelectedIndex} />} 
          />
          <Route exact path="/websites" element={
            <Websites setValue={setValue} setSelectedIndex={setSelectedIndex} />} 
          />
          <Route exact path="/revolution" element={<div>The Revolution</div>} />
          <Route exact path="/about" element={<div>About Us</div>} />
          <Route exact path="/contact" element={<div>Contact Us</div>} />
          <Route exact path="/estimate" element={<div>Free Estimate</div>} />
        </Routes>
        <Footer 
          setValue={setValue} 
          setSelectedIndex={setSelectedIndex} 
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
