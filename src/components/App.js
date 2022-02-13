import '../App.css';
import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme from './ui/Theme';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import LandingPage from './LandingPage';

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
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/services" element={<div>Services</div>} />
          <Route exact path="/customsoftware" element={<div>Custom Software</div>} />
          <Route exact path="/mobileapps" element={<div>Mobile Apps</div>} />
          <Route exact path="/websites" element={<div>Websites</div>} />
          <Route exact path="/revolution" element={<div>The Revolution</div>} />
          <Route exact path="/about" element={<div>About Us</div>} />
          <Route exact path="/contact" element={<div>Contact Us</div>} />
          <Route exact path="/estimate" element={<div>Free Estimate</div>} />
        </Routes>
        <Footer 
          value={value} 
          setValue={setValue} 
          selectedIndex={selectedIndex} 
          setSelectedIndex={setSelectedIndex} 
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
