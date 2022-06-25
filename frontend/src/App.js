import './App.css';
import React from 'react';
import GensiForm from './components/gensiForm'
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import {ResponsiveHeader} from './components/responsiveHeader'
import { useState } from 'react';
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet";
import { PaletteStoreContext, PaletteStoreProvider } from './theme';

//store.myColour

function App() {
  
  const store = React.useContext(PaletteStoreContext);
  console.log(store)
  const theme = deepMerge(grommet, store.myColour.activePalette);

  return (
    <PaletteStoreProvider>
    <Grommet
      full
      theme = {theme}
    >
      <Box fill="vertical"> 
        <ResponsiveHeader store = {store}/>
        <GensiForm></GensiForm>
      </Box>
    </Grommet>
    </PaletteStoreProvider>
  );
}


export default App;
