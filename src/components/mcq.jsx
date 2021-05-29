/**
 * component that handles a multiple choice question with an arbitrary number of choices. 
 * Wraps around grommet RadioButtonGroup and provides yet another for the gensiForm
 */

 import React, { useState, useEffect } from 'react';
 import { Button, Text, Box, RadioButtonGroup} from "grommet";

export default function MCQ({
    titles,
    //customValues, TODO implement cause right now we ust use the index 
}){
    const [value, setValue] = useState('');

    function getQuestions (){
        const questions = titles.map((title, i) => ({label: `${title}`, value:  `${i}` }))
        //const questions = titles.map((title, i)=> `${title} lollone` )

        console.log("titles", titles)
        console.log("questions", questions)
        return questions
    }
        const questions = titles.map((title, i) => ({label: `${title}`, value:  `${i}` }))
        //const questions = titles.map((title, i)=> `${title} lollone` )

        console.log("titles", titles)
        console.log("questions", questions)

    return(
            <Box id="mcq page" align="center" pad="large" justify="center" align="center" fill="vertical" >
                <RadioButtonGroup  align="center" justify="center" 
                    name="radio"
                    options={getQuestions()}
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
            </Box>
    )
}