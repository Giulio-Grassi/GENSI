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
    secondary: "blue",
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
    secondary: "purple",
    accent: "brown",
    background: "pink",
    text: "white",
    anchor: "white"
}}

class Palette {
    
    darkMode = false
    activePalette = lightPalette

    constructor(){
        makeAutoObservable(this)
    }

    toggle = () => {
        console.log(this.darkMode)
        console.log(this.activePalette)
        this.darkMode = !this.darkMode
        this.darkMode ? this.activePalette = darkPalette : this.activePalette = lightPalette
        console.log("toggle works")
        console.log(this.darkMode)
        console.log(JSON.stringify(this.activePalette))
    }

}

export const paletteMob = new Palette()