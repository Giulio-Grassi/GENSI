/**
 * component that has two buttons to navigate the GENSIform
 *
 */

import React, { useState, useEffect } from "react";
import { Button, Text, Box, RadioButtonGroup } from "grommet";

export default function MCQ({
  onNext,
  onPrev,
  //customValues, TODO implement cause right now we ust use the index
}) {
  return (
    <Box 
    direction="row" 
    justify="between" 
    align="end" 
    pad="xlarge">

        <Box>
          {typeof onPrev === "function" && (
            <Button 
            primary 
            label="Prev" 
            justify="start" 
            onClick={() => onPrev()} 
            />)}
        </Box>

        <Box>{typeof onNext === "function" &&(
            <Button 
                primary 
                label="Next" 
                justify="end" 
                onClick={() => onNext()} 
            />)}
        </Box>

    </Box>
  );
}
