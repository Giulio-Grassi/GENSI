/**
 * This components handles the top level state of the form that we will ultimately submit.
 * This component is basically the entry point of the GENSI application
 * Every "page" saves their state in this parent component.
 * This is a simple multi-page form architecture. 
 */
import React from 'react';
import ButtonFooter from './buttonFooter'
import { Box } from 'grommet';
import { Text } from "grommet";
import NodeRow from './questionTypes/nodeRow';
import LineBox from './questionTypes/lineBox';
import Ladder from './questionTypes/ladder';
import MCQ from './questionTypes/mcq'
import ContactNetwork from './questionTypes/contactNetwork';

import * as cntrl from "../controllers/QStratController"
import { survey } from '../stores/questionsStore';
import { observer } from "mobx-react-lite"



export const  QuestionStrategy = observer(({
  nodes,
  setNodes,
  questions,
  table,
  setTable,
  superNext,
  darkMode,
}) => {

  const [currentQuestion, setCurrentQuestion] = React.useState(0)

  // state specifically for network component... 
  const [networkCounter, setNetworkCounter] = React.useState(2) //given we always filter you... and first node is 1...
  const [relToAdd, setRelToAdd] = React.useState([])

  // function nextQuestion(){
  //   if(currentQuestion < questions.length-1){
  //     setCurrentQuestion(currentQuestion+1)
  //   }
  //   else{
  //     superNext()
  //   }
  // }

  // function prevQuestion(){
  //   if(currentQuestion > 0){
  //     setCurrentQuestion(currentQuestion-1)
  //   }
  //   else if(currentQuestion === 0){
  //     alert(CANT_GO_BACK_ALERT)
  //   }
  // }


  // function dragNDropValidation(buttonCallback){
  //   let valid = true
  //   let i = 0
  //   while(valid && i < nodes.length){
  //     //table.getRelation(question.id, x.id)
  //     if(table.getRelation(questions[currentQuestion].getId(), nodes[i].getName())[0][2] === false){
  //       valid = false
  //     }
  //     i++
  //   }

  //   valid ? buttonCallback() : alert("Please put all the nodes in a box before changing page.")
  // }

  // function mcqValidation(buttonCallback){
  //   let valid = true;
  //   if(table.getRelation(questions[currentQuestion].getId(), nodes[0].getName())[0][2] === false){
  //       valid = false
  //   }
  //   (valid)? buttonCallback() : alert("please select an option before proceeding")
  // }

  /**
   * handles the newtork given addToRel 
   * @param {*} buttonCallback 
   */
  function networkNext(buttonCallback){
    console.log("network next")
    if (networkCounter + 1 < nodes.length + 1)
    {
      setNetworkCounter(networkCounter +1)
      console.log("network counter : ", networkCounter)
      console.log("relToAdd : ", relToAdd)
      // const newtable = table.addNetworkPairs(questions[currentQuestion].id, relToAdd)
      // add the rels to the table
      // setTable(newtable)
      // setRelToAdd([])
      // console.log("relToAdd2 : ", relToAdd)

    }
    else{
      console.log("FINAL relToAdd : ", relToAdd)
      const newtable = table.addNetworkPairs(survey.currentQuestion.id, relToAdd)
      setTable(newtable)
      console.log(newtable.getAnswers(survey.currentQuestion.id))
      
      buttonCallback()
      setNetworkCounter(2)
    }
  }
  function questionComponentSelector(){
    console.log("STRATEGY : " + survey.currentQNumber + " " + survey.QID)
    console.log(survey.currentQuestion)
    switch (survey.QType) {
        case "dragndrop":
          return (
            <Box id="case 3 box" fill= "vertical">
              <Text size="xxxlarge" className="title">
                {survey.currentQuestion.text}
              </Text>
              <LineBox
                nodes={nodes}
                question={survey.currentQuestion}
                table={table}
                setTable={setTable}
                filterYou={false}
                darkMode={darkMode}
              />
              <ButtonFooter
              onNext = {() => cntrl.dragNDropValidation(cntrl.next, table, nodes)}
              onPrev = {() => cntrl.dragNDropValidation(cntrl.prev, table, nodes)}
              /> 
            </Box>
          );
        case "ladder":
          return (
            <Box id="case 3 box" fill= "vertical">
              <Text size="xxxlarge" className="title">
                {survey.currentQuestion.text}
              </Text>
              <Ladder
                nodes={nodes}
                question={survey.currentQuestion}
                table={table}
                setTable={setTable}
                filterYou={false}
                darkMode={darkMode}
              />
              <ButtonFooter
              onNext = {() => cntrl.dragNDropValidation(cntrl.next, table, nodes)}
              onPrev = {() => cntrl.dragNDropValidation(cntrl.prev, table, nodes)}
              /> 
            </Box>
          );
        case "mcq":
          return (
            <Box id="case 3 box" fill= "vertical">
              <Text size="xxxlarge" className="title">
                {survey.currentQuestion.text}
              </Text>
              <MCQ
                node={nodes[0].getName()}
                question={survey.currentQuestion}
                table={table}
                setTable={setTable}
                filterYou={false}
              />
              <ButtonFooter
              onNext = {() => cntrl.mcqValidation(cntrl.next, table, nodes)}
              onPrev = {() => cntrl.mcqValidation(cntrl.prev, table, nodes)}
              /> 
            </Box>
          );
          case "network":
            return (
              <Box id="case 3 box" fill= "vertical">
                <Text size="xxxlarge" className="title">
                  {survey.currentQuestion.text}
                </Text>
                <ContactNetwork
                  nodes={nodes}
                  question={survey.currentQuestion}
                  table={table}
                  setTable={setTable}
                  filterYou={true}
                  relToAdd={relToAdd}
                  setRelToAdd={setRelToAdd}
                  internalCounter={networkCounter}
                  
                />
                <ButtonFooter
                onNext = {() => networkNext(cntrl.next)}
                onPrev = {() => cntrl.prev()}
                /> 
              </Box>
            );
        default:
          return (
            <Box id="case 3 box" fill= "vertical">
              <Text size="xxxlarge" className="title">
                {survey.currentQuestion.text}
              </Text>
              <p className="subtitle">{"When a node moves up, it means it is selected. And its unselected if it moves down."}</p>
              <NodeRow
                nodes={nodes}
                setNodes={setNodes}
                question={survey.currentQuestion}
                table={table}
                setTable={setTable}
                filterYou={true}
                currentQuestion={currentQuestion}
              />
              <ButtonFooter
              onNext = {() => cntrl.next()}
              onPrev = {() => cntrl.prev()}
              /> 
            </Box>
          );
      }
}

  return  questionComponentSelector()
  })