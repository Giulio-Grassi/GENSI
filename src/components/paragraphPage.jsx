/**
 * this components is used to have pages in the form where only text is displayed. 
 * For example, a usecase would be an introduction screen where the purpose of the survey is explained 
 */
 import React from 'react';
 import { Button, Text, Box } from "grommet";

export default function ParagraphPage({
}){
    return(
            <Box id="paragraph page" fill= "vertical" justify="center" align="center" pad= "small" height="medium" >
                <Text size="xlarge" >
                This is a demonstration of the features currently available in this "version of GENSI...?"
                </Text>
            </Box>

    )
}