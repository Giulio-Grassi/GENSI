/**
 * This components handles the top level state of the form that we will ultimately submit.
 * This component is basically the entry point of the GENSI application
 * Every "page" saves their state in this parent component.
 * This is a simple multi-page form architecture. 
 */
import React, { Component } from 'react';
import ParagraphPage from './paragraphPage'
import NodeCreationFunction from './nodeCreationFunction'
import NodeRow from './nodeRow';
import MCQ from './mcq'
import ButtonFooter from './buttonFooter'
import { Box } from 'grommet';
import { Node } from './models/node';
import { Table } from './models/table';  
import { Question } from './models/question';  
import { Text } from "grommet";


export default function QuestionStrategy({
  nodes,
  questions,
  table,
  setTable,
  superNext,
}){

  const [currentQuestion, setCurrentQuestion] = React.useState(0)

  function nextQuestion(){
    if(currentQuestion < questions.length-1){
      setCurrentQuestion(currentQuestion+1)
    }
    else{
      superNext()
    }
  }

  function prevQuestion(){
    if(currentQuestion > 0){
      setCurrentQuestion(currentQuestion-1)
    }
  }

  function questionComponentSelector(){
    switch (questions[currentQuestion].getType()) {
        case "select":
          return (
            <Box id="case 3 box" fill= "vertical">
              <Text>{questions[currentQuestion].getText()}</Text>
              <NodeRow
                nodes={nodes}
                question={questions[currentQuestion].id}
                table={table}
                setTable={setTable}
                filterYou={true}
                currentQuestion={currentQuestion}
              />
              <ButtonFooter
              onNext = {() => nextQuestion()}
              onPrev = {() => prevQuestion()}
              /> 
            </Box>
          );
        default:
          (console.log('Question type not valid.', questions[currentQuestion]))
      }
}
  return questionComponentSelector()
    
  }