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
// import saveAnswersOnDatabase from './uploadAnswers'
// import saveAnswersSeparately from './uploadSingleAnswers'

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
  



  function saveAnswersOnDatabase(){
      // e.preventDefault()
      var counter = 1
      var anonymizedNames = []
      nodes.forEach(x => {
        var t = {
          name: x.getName(),
          anonName: counter++,
        }
        anonymizedNames.push(t)
      })
  
      const totalAnswers = []
  
      for(let i = 0; i < questions.length; i++){
        var results = table.getAll().filter(x => x[0] === i+1)
        var answer = {}
  
        if(results && results.length > 0){
          if(results[0][3] === "mcq"){
            /*1: { //mcq
              questionType: "mcq"
              title: "How do you like yourself?"
              answer: "a lot",
            },*/
            answer = {
              questionType: "mcq",
              title: questions[i].getText(),
              answer: results[0][2],
            }
          }
          else if(results[0][3] === "ladder"){
            /*2: { //ladder
              questionType: "ladder"
              title: "how do you like these people"
              answer: [
                1: {
                  title: "like a lot"
                  answer: [1,3]
                }
                2: {
                  title: "like somehow"
                  answer: [4]
                }
              ]
            }*/
            console.log("we inside ladder")
            console.log(results)
  
            let boxesLadder  = questions[i].getBoxes()
            var ans = []
            boxesLadder.forEach(b => {
              var ansArray = []
              var boxResults = results.filter(x => x[2] === b.id)
              boxResults.forEach(br => {
                ansArray.push(anonymizedNames.filter(aN => aN.name === br[1])[0].anonName)
              })
  
              var tempAns = {
                title: b.id,
                answer: ansArray
              }
  
              ans.push(tempAns)
            })
  
            answer = {
              questionType: "ladder",
              title: questions[i].getText(),
              answer: ans
            }
          }
          else if(results[0][3] === "linebox"){
            /*2: {
              questionType: "linebox"
              title: "how do you like these people"
              answer: [
                1: {
                  title: "like a lot"
                  answer: [1,3]
                }
                2: {
                  title: "like somehow"
                  answer: [4]
                }
              ]
            }*/
            let boxesLadder  = questions[i].getBoxes()
            var ans = []
            boxesLadder.forEach(b => {
              var ansArray = []
              var boxResults = results.filter(x => x[2] === b.id)
              boxResults.forEach(br => {
                ansArray.push(anonymizedNames.filter(aN => aN.name === br[1])[0].anonName)
              })
  
              var tempAns = {
                title: b.id,
                answer: ansArray
              }
  
              ans.push(tempAns)
            })
  
            answer = {
              questionType: "linebox",
              title: questions[i].getText(),
              answer: ans
            }
          }
          else if(results[0][3] === "noderow"){
            /*{
                  questionType: "noderow"
                  title: "Has bullied someone",
                  answer: {
                      selected: [3],
                      unselected: [1,4]
              }
            }*/
            console.log("we inside noderow")
            console.log(results)
            var ansSelected = []
            var andUnselected = []
            results.forEach(r => {
              if(r[2]){
                ansSelected.push(anonymizedNames.filter(aN => aN.name === r[1])[0].anonName)
              }else{
                andUnselected.push(anonymizedNames.filter(aN => aN.name === r[1])[0].anonName)
              }
            })
  
            answer = {
              questionType: "noderow",
              title: questions[i].getText(),
              answer: {
                selected: ansSelected,
                unselected: andUnselected
              }
            }
          }
          else if(results[0][3] === "network"){
            //For network we save the object containing the relationships
            answer = {
              questionType: "network",
              answer: results[0][1],
            }
          }
          totalAnswers.push(answer)
        }
      }
      const container = (surveyId, totalAnswers)
      
      //Post the event to mongodb
      axios({
        method: 'post',
        url:'http://localhost:8080/api/survey/add', 
        data: {container}})
          .then(
              alert("Success.")
          )
          .catch((error) => {
              alert("Something went wrong when saving your answers!")
              console.log("Answers uploading error", error)
          });    
      console.log("Uploaded Answers",totalAnswers)  
    }
  






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
            // saveAnswersOnDatabase(surveyId, questions, table, nodes)
            saveAnswersOnDatabase()
            // saveAnswersSeparately(surveyId, questions, table, nodes)
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