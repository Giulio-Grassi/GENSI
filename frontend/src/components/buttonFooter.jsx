/**
 * component that has two buttons to navigate the GENSIform
 *
 */

import React, { useState, useEffect } from "react";
import { Button, Text, Box, RadioButtonGroup } from "grommet";
import {NEXT_BUTTON_TEXT, PREV_BUTTON_TEXT} from "./config/localisation"
export default function MCQ({
  onNext,
  onPrev,
  //customValues, TODO implement cause right now we ust use the index
}) {
  return (
    <div className="footer">
        <div className="prevButton">
          {typeof onPrev === "function" && (
            <Button 
            primary 
            label= {PREV_BUTTON_TEXT}
            justify="start" 
            onClick={() => onPrev()} 
            />)}
        </div>

        <div className="nextButton">
          {typeof onNext === "function" &&(
            <Button 
                primary 
                label={NEXT_BUTTON_TEXT} 
                justify="end" 
                onClick={() => onNext()} 
            />)}
        </div>
    </div>
  );
}
