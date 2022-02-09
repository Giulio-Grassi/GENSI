/**
 * component that handles a multiple choice question with an arbitrary number of choices. 
 * Wraps around grommet RadioButtonGroup and provides yet another for the gensiForm
 */

 import React, { useState, useEffect } from 'react';
 import { Button, Text, Box, RadioButtonGroup} from "grommet";

export default function MCQ({
    node,
    question,
    table,
    setTable,
    filterYou,    //customValues, TODO implement cause right now we ust use the index 
}){
    const [value, setValue] = useState(false);


        const boxes =question.getBoxes()
        const options = boxes.map(box => box.id);
    return(

            <Box id="mcq page" align="center" pad="large" justify="center" align="center" fill="vertical" >
                <RadioButtonGroup  align="center" justify="center" 
                    name="radio"
                    options={options}
                    value={value}
                    onChange={event => {setValue(event.target.value)
                                         table.updateRelation(question.id, node, event.target.value)
                                         console.log(table.getAll())
                                        }}
                />
            </Box>
    )
}