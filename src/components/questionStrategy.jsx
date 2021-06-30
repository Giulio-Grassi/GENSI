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
import LineBox from './lineBox';
import Ladder from './lineBox';


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

  function nextQuestionValidationDragndrop(){
    let valid = true
    let i = 0
    while(valid && i < nodes.length){
      //table.getRelation(question.id, x.id)
      if(table.getRelation(questions[currentQuestion].getId(), nodes[i].getName())[0][2] === false){
        valid = false
      }
      i++
    }
    
    if(valid){
      nextQuestion()
    }
    else{
      alert("You need to put all the nodes in a box before the next step.")
    }
  }

  function prevQuestionValidationDragndrop(){
    let valid = true
    let i = 0
    while(valid && i < nodes.length){
      //table.getRelation(question.id, x.id)
      if(table.getRelation(questions[currentQuestion].getId(), nodes[i].getName())[0][2] === false){
        valid = false
      }
      i++
    }
    
    if(valid){
      prevQuestion()
    }
    else{
      alert("You need to put all the nodes in a box before going back.")
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
                question={questions[currentQuestion]}
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
          case "dragndrop":
            return (
              <Box id="case 3 box" fill= "vertical">
                <Text>{questions[currentQuestion].getText()}</Text>
                <LineBox
                  nodes={nodes}
                  question={questions[currentQuestion]}
                  table={table}
                  setTable={setTable}
                  filterYou={false}
                />
                <ButtonFooter
                onNext = {() => nextQuestionValidationDragndrop()}
                onPrev = {() => prevQuestionValidationDragndrop()}
                /> 
              </Box>
            );
            case "ladder":
              return (
                <Box id="case 3 box" fill= "vertical">
                  <Text>{questions[currentQuestion].getText()}</Text>
                  <LineBox
                    nodes={nodes}
                    question={questions[currentQuestion]}
                    table={table}
                    setTable={setTable}
                    filterYou={false}
                  />
                  <ButtonFooter
                  onNext = {() => nextQuestionValidationDragndrop()}
                  onPrev = {() => prevQuestionValidationDragndrop()}
                  /> 
                </Box>
              );
        default:
          (console.log('Question type not valid.', questions[currentQuestion]))
      }
}
  return questionComponentSelector()
    
  }