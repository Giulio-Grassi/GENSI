import { makeAutoObservable } from "mobx"
import { observer, useLocalStore, useObserver } from "mobx-react-lite"
import React from "react";

const darkPalette = {
    global: {
        font: {
          //family: "Roboto Condensed", //font needs to be supported by default on all computers and operating systems
          size: "14px"
        },
    primary: "red",
    seconday: "blue",
    accent: "black",
    background: "white",
    text: "green",
    anchor: "white"
}}

const lightPalette = {
    global: {
        font: {
          //family: "Roboto Condensed", //font needs to be supported by default on all computers and operating systems
          size: "14px"
        },
    primary: "orange",
    seconday: "purple",
    accent: "brown",
    background: "pink",
    text: "white",
    anchor: "white"
}}

class Colour {
    
    constructor(){
        makeAutoObservable(this)
        [this.darkMode, this.setDarkode] = useState(false),
        this.activePalette = lightPalette
    }

    toggle = () => {
        console.log(this.darkMode)
        console.log(this.activePalette)
        //this.darkMode = !this.darkMode 
        this.setDarkMode
        this.darkMode ? this.activePalette = darkPalette : this.activePalette = lightPalette
        console.log("toggle works")
        console.log(this.darkMode)
        console.log(this.activePalette)
    }

}

const myColour = new Colour()

export const ColourView = observer(({ colour }) => <span>{colour.activePalette}</span>)


//const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)


export const PaletteStoreContext = React.createContext();


export const PaletteStoreProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(false);
  const store = useLocalStore(() => ({
    
    myColour
  }));

  return (
    <PaletteStoreContext.Provider value={{store, darkMode, setDarkMode}}>{children}</PaletteStoreContext.Provider>
  );
};

