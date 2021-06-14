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


export default function GensiForm() {
  const [step, setStep] = React.useState(1)

  //   const [nodes[], setNodes] = React.useState('');
  const [nodes, setNodes] = React.useState([new Node("You", 0, 0)]); //Array of nodes. 0 and 0 are attributes fx and fx that used by d3 to fix a node in positon
  const [questions, setQuestion] = React.useState([new Question(1, "WHO YOU LIKE THE MOST?")]); //React state containing the array of questions
  const [table, setTable] = React.useState(new Table()); //State containing the MxN relationship table
  const [links, setLinks] = React.useState([]); //D3 links between the visual nodes.


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
    const latestNodeIndex = nodes.length;  //MIGHT BE NOT SAFE DEPENDING ON THE UPDATE CYCLE. "-1" MAKES  IT DELAYED
    setLinks(
        [...links,
        {"source": 0, "target": latestNodeIndex}]
        ); //0 is the hardcoded value for "You"

        console.log("NODES",nodes)
        console.log("LINKS",links)
  }

  function populateTable(){
    for(var i = 1; i<=questions.length; i++){
      for(var k = 1; k<=nodes.length; k++){
        table.insertRelation(i, k, false)
      }
    }
  }

  function renderPageBaseOnStep(){
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
              links={links}
              onNodeCreation={createNode}
            />
            <ButtonFooter
            onNext = {populateTable(),nextStep}
            /> 
            </Box>
            );
        case 3: 
          return (
            <Box id="case 3 box" fill= "vertical">
            <NodeRow
            nodes={nodes}
            questions={questions}
            table={table}
            filterYou={true}
            />
            <ButtonFooter
            onNext = {nextStep}
            /> 
            </Box>

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