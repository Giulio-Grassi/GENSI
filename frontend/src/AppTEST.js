import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

// import { timerMob } from "./TIMERMOBX"
import { paletteMob } from "./PaletteStore"



import './App.css';
import GensiForm from './components/gensiForm'
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import {ResponsiveHeader} from './components/responsiveHeader'
import { useState } from 'react';
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet";
import { PaletteStoreContext, PaletteStoreProvider } from './theme';
import App from "./App"
import { acme } from "./components/assets/themes/theme"



// export const TimerView = observer(() => <span>Seconds passed: {timerMob.secondsPassed}</span>)

// setInterval(() => {
//     timerMob.increaseTimer()
// }, 1000)

const theme = deepMerge(grommet, acme);

export const PaletteView = observer(() => 

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

) 


// setInterval(() => {
//     paletteMob.toggle()
// }, 1000)

