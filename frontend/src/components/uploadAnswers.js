import axios from 'axios';


function saveAnswersOnDatabase(surveyId, questions, table, nodes){
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
      url:'http://backend:8080/api/survey/add', 
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

  export default saveAnswersOnDatabase