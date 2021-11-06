/**
 * this components is used to have pages in the form where only text is displayed. 
 * For example, a usecase would be an introduction screen where the purpose of the survey is explained 
 */
 import React from 'react';
 import { Button, Text, Box } from "grommet";

export default function ParagraphPage(props){
    const {sentence} = props
    return(
            <Box id="paragraph page" fill= "vertical" justify="center" align="center" pad= "small" height="medium" >
                <div className="horizontalClass">
                    <Text size="xxxlarge" className="title">
                        {sentence}
                    </Text>
                    <div id="flip">
                        <div><div>BOLD</div></div>
                        <div><div>FAST</div></div>
                        <div><div>PRIVATE</div></div>
                    </div>
                </div>
                <p className="subtitle">{"When returing to an answered question, it will be reset. So, please do it only if you'll change the choice."}</p>
                <p className="subtitle">{"And you can leave it empty if you want to submit the previous answer."}</p>
            </Box>

    )
}