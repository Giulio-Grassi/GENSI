import './App.css';
import React from 'react';
import GensiForm from './components/gensiForm'
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import {ResponsiveHeader} from './components/responsiveHeader'
import { useState } from 'react';
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet";
import { PaletteStoreContext, PaletteStoreProvider } from './theme';
import { paletteMob } from './PaletteStore';
import { acme } from './components/assets/themes/theme';

//store.myColour

function App() {
  

  const theme = deepMerge(grommet, acme);
  
  return (
    <Grommet
      full
      theme = {theme}
      themeMode = {paletteMob.darkMode ? "dark" : "light"}
    >
      <Box fill="vertical"> 
        <ResponsiveHeader/>
        <GensiForm></GensiForm>
      </Box>
    </Grommet>
  );
}


export default App;
