/**
 * This components handles the top level state of the form that we will ultimately submit.
 * This component is basically the entry point of the GENSI application
 * Every "page" saves their state in this parent component.
 * This is a simple multi-page form architecture. 
 */
import React, { Component } from 'react';
import ParagraphPage from './paragraphPage'
import NodeCreationFunction from './nodeCreationFunction'
import MCQ from './mcq'
import ButtonFooter from './buttonFooter'
import { Box } from 'grommet';
import { Node } from './models/node';
import { Table } from './models/table';  
import { Question } from './models/question';  
import { Text, Button } from "grommet";
import QuestionStrategy from './questionStrategy';
import myquestions from './questions'

export default function GensiForm() {
  const [step, setStep] = React.useState(1)
  const question1 = {
    id: 1,
    text: "Who do you like?",
    type: "select"
  }
  const question2 = {
    id: 2,
    text: "WEALTH QUESTION",
    type: "dragndrop",
    boxes: [{id: "More wealthy than me", colour: "#AED6F1"},{id: "Less wealthy than me", colour: "#E74C3C"}]
  }

  //   const [nodes[], setNodes] = React.useState('');
  const [nodes, setNodes] = React.useState([new Node("You", 0, 0, true)]); //Array of nodes. 0 and 0 are attributes fx and fx that used by d3 to fix a node in positon
  const [questions, setQuestion] = React.useState([new Question(question1), new Question(question2)]); //React state containing the array of questions
  const [table, setTable] = React.useState(new Table()); //State containing the MxN relationship table


  // Proceed to next step
  function nextStep(){
    setStep(step + 1);
  };

  // Go back to prev step
  function prevStep(){
    setStep(step - 1);
  };

  function createNode(nodeName) { //IMPORTANT AS ALL THE USESTATES NEED TO BE INITIALISED 
     setNodes(
        [...nodes,
        new Node(nodeName, 0, 0)]
        );
  }

  function populateTable(){
    for(var i = 0; i < questions.length; i++){
      for(var k = 0; k < nodes.length; k++){
        table.insertRelation(questions[i].getId(), nodes[k].getName(), false)
      }
    }
    console.log("populateTable", table.getAll())
  }

  function renderPageBaseOnStep(){

    //TODO NINAD: MOVE THIS CODE, ALSO TEST IF THIS ACTUALLY WORKS 
     const myquestionsvar = myquestions()
     const questionArray = myquestionsvar.map(q => new Question(q))

    switch (step) {
        case 1:
          return ( <Box id="case 1 box" fill= "vertical" >
            <ParagraphPage
            />
            <ButtonFooter
            onNext = {nextStep}
            onPrev = {prevStep}
            /> 
            </Box>
          );
        case 2:
          return (
            <Box  id="case 2 box" fill= "vertical">
            <NodeCreationFunction
              nodes={nodes}
              onNodeCreation={createNode}
            />
            <ButtonFooter
            onNext = {() => {
              populateTable();
              nextStep();
            }}
            /> 
            </Box>
            );
        case 3:
          /*return (
            <Box id="case 3 box" fill= "vertical">
              <Text>Dioacnae</Text>
            <NodeRow
            nodes={nodes}
            questions={questions}
            table={table}
            setTable={setTable}
            filterYou={true}
            />
            <ButtonFooter
            onNext = {nextStep()}
            /> 
            </Box>

          );*/
          return (
              <QuestionStrategy
              nodes={nodes}
              questions={questions}
              table={table}
              setTable={setTable}
              superNext={() => nextStep()}
              />
          );
         case 4:
           return(
            <Box id="case 4 box" fill= "vertical">
              <MCQ
              titles= {['choice 1', 'choice 2', 'choice 3']}
              />
              </Box>
);
          //  case 5:
          //   return <Success />;
        default:
          (console.log('This is a multi-step form built with React.'))
      }
}
  return renderPageBaseOnStep()
    
  }