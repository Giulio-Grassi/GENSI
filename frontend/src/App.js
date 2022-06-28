import './App.css';
import React from 'react';
import GensiForm from './components/gensiForm'
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import { ResponsiveHeader } from './components/responsiveHeader'
import { useState } from 'react';
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet";
import { acme } from './components/assets/themes/theme';
import { paletteMob } from './PaletteStore';
import { Observer, observer } from "mobx-react-lite"

import getQuestions from './components/config/questions';
console.log(getQuestions)
//store.myColour

function App() {


  const theme = deepMerge(grommet, paletteMob.activePalette);

  return (
    <Grommet
      full
      theme={theme}
      themeMode={paletteMob.darkMode ? "dark" : "light"}
    >
      <Box fill="vertical">
        <ResponsiveHeader />
        <GensiForm></GensiForm>
      </Box>
    </Grommet>
  );
}


export default observer(App);
