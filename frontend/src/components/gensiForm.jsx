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
import { Grommet, Text, Button } from "grommet";
import QuestionStrategy from './questionStrategy';
import getQuestions from './config/questions'
import './assets/css/styles.css'
import axios from 'axios';
import saveAnswersOnDatabase from './uploadAnswers'
import saveAnswersSeparately from './uploadSingleAnswers'

export default function GensiForm(props) {
  const [step, setStep] = React.useState(1)
  //   const [nodes[], setNodes] = React.useState('');
  const [nodes, setNodes] = React.useState([new Node(1, "You", 0, 200, true)]); //Array of nodes. 0 and 0 are attributes fx and fx that used by d3 to fix a node in positon
  //   question initaliser from json
  const myquestionsvar = getQuestions()
  const questionArray = myquestionsvar[1].map(q => new Question(q))
  const surveyId = myquestionsvar[0].surveyId
  const upperBound = myquestionsvar[0].upperBoundNodes
  const lowerBound = myquestionsvar[0].lowerBoundNodes
  const [questions, setQuestion] = React.useState(questionArray); //React state containing the array of questions
  const [table, setTable] = React.useState(new Table()); //State containing the MxN relationship table
  
  // Proceed to next step
  function nextStep(){
    setStep(step + 1);
  };

  function nextStepWithValidator(){
    if(nodes.length <= upperBound && nodes.length >= lowerBound){
      setStep(step + 1);
    }
    else{
      alert("You need to have at least "+lowerBound+" and at most "+upperBound+" nodes.")
    }
  };

  // Go back to prev step
;

  function createNode(nodeName) { //IMPORTANT AS ALL THE USESTATES NEED TO BE INITIALISED
    if(nodeName && nodeName.length > 0){
      const findPotentialDuplicate = nodes.filter(x => x.getName() === nodeName)

      if(findPotentialDuplicate.length === 0){
        setNodes([...nodes,  new Node(nodes.length + 1, nodeName, 0, 0)])
      }
    }
  }

  function populateTable(){
    for(var i = 0; i < questions.length; i++){
      if(questions[i].getType()==='mcq'){
        table.insertRelation(questions[i].getId(), nodes[0].getName(), false, "mcq")
        continue
      }
      if(questions[i].getType()==='network'){
        continue
      }
      for(var k = 0; k < nodes.length; k++){
        table.insertRelation(questions[i].getId(), nodes[k].getName(), false, questions[i].getType())
      }
    }
    console.log("populateTable", table.getAll())
  }

  function renderPageBaseOnStep(){
    switch (step) {
        case 1:
          return ( <Box id="case 1 box" fill= "vertical" >
            <ParagraphPage sentence="GENSI  is  ↗"/>
            <ButtonFooter
              onNext = {nextStep}
            /> 
            </Box>
          );
        case 2:
          return (
            <Box  id="case 2 box" fill= "vertical">
            <NodeCreationFunction
              nodes={nodes}
              onNodeCreation={createNode}
              maxNodes = {upperBound}
            />
            <ButtonFooter
            onNext = {() => {
              populateTable();
              nextStepWithValidator();
            }}
            /> 
            </Box>
            );
        case 3:
          return (
              <QuestionStrategy
                nodes={nodes}
                setNodes={setNodes}
                questions={questions}
                table={table}
                setTable={setTable}
                superNext={() => nextStep()}
                darkMode={props.darkMode}
              />
          );
          case 4:
            saveAnswersOnDatabase(surveyId, questions, table, nodes)
            saveAnswersSeparately(surveyId, questions, table, nodes)
            return (
              <Box id="paragraph page" fill= "vertical" justify="center" align="center" pad= "small" height="medium" >
                  <Text size="xxxlarge" className="title">
                      Thanks for taking the survey.
                  </Text>
                  <div id="flip">
                      <div><div>See ya :)</div></div>
                      <div><div>Arrivederci</div></div>
                      <div><div>Adios!</div></div>
                  </div>
              </Box>
            );
        default:
          (console.log('This is a multi-step form built with React. And this step number is not supported!'))
      }
}
  return renderPageBaseOnStep()
  }