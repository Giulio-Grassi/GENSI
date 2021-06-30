/**
 * This components handles the top level state of the form that we will ultimately submit.
 * This component is basically the entry point of the GENSI application
 * Every "page" saves their state in this parent component.
 * This is a simple multi-page form architecture. 
 */
import React, { Component } from 'react';
import ParagraphPage from './paragraphPage'
import NodeCreationFunction from './nodeCreationFunction'

import ButtonFooter from './buttonFooter'
import { Box } from 'grommet';
import { Node } from './models/node';
import { Table } from './models/table';  
import { Question } from './models/question';  
import { Text } from "grommet";
import NodeRow from './nodeRow';
import LineBox from './lineBox';
import Ladder from './ladder';
import MCQ from './mcq'


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


  function dragNDropValidation(buttonCallback){
    let valid = true
    let i = 0
    while(valid && i < nodes.length){
      //table.getRelation(question.id, x.id)
      if(table.getRelation(questions[currentQuestion].getId(), nodes[i].getName())[0][2] === false){
        valid = false
      }
      i++
    }

    valid? buttonCallback() : alert("Please put all the nodes in a box before changing page.")
  }

  function mcqValidation(buttonCallback){
    let valid = true;
    if(table.getRelation(questions[currentQuestion].getId(), nodes[0].getName())[0][2] === false){
        valid = false
    }
    (valid)? buttonCallback() : alert("please select an option before proceeding")
  }

  function questionComponentSelector(){
    switch (questions[currentQuestion].getType()) {
        case "select":
          return (
            <Box id="case 3 box" fill= "vertical">
              <Text
                              alignSelf = "center"
                              size = "xxlarge"
                >{questions[currentQuestion].getText()}</Text>
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
              <Text 
                alignSelf = "center"
                size = "xxlarge"
              >{questions[currentQuestion].getText()}</Text>
              <LineBox
                nodes={nodes}
                question={questions[currentQuestion]}
                table={table}
                setTable={setTable}
                filterYou={false}
              />
              <ButtonFooter
              onNext = {() => dragNDropValidation(nextQuestion)}
              onPrev = {() => dragNDropValidation(prevQuestion)}
              /> 
            </Box>
          );
          case "ladder":
            return (
              <Box id="case 3 box" fill= "vertical">
                <Text
                                                alignSelf = "center"
                                                size = "xxlarge"
                      >{questions[currentQuestion].getText()}</Text>
                <Ladder
                  nodes={nodes}
                  question={questions[currentQuestion]}
                  table={table}
                  setTable={setTable}
                  filterYou={false}
                />
                <ButtonFooter
                onNext = {() => dragNDropValidation(nextQuestion)}
                onPrev = {() => dragNDropValidation(prevQuestion)}
                /> 
              </Box>
            );
          case "mcq":
            return (
              <Box id="case 3 box" fill= "vertical">
                <Text
                                alignSelf = "center"
                                size = "xxlarge"
                    >{questions[currentQuestion].getText()}</Text>
                <MCQ
                  node={nodes[0].getName()}
                  question={questions[currentQuestion]}
                  table={table}
                  setTable={setTable}
                  filterYou={false}
                />
                <ButtonFooter
                onNext = {() => mcqValidation(nextQuestion)}
                onPrev = {() => mcqValidation(prevQuestion)}
                /> 
              </Box>
            );
        default:
          (console.log('Question type not valid.', questions[currentQuestion]))
      }
}
  return questionComponentSelector()
    
  }