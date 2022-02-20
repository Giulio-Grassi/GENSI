export default function getQuestions() {
    return (
        ([
            {
                surveyId: "FIRST001-Imke",
                upperBoundNodes: 10,
                lowerBoundNodes: 4,
            },
            [
                {
                    "id": 1,
                    "text" : "Who knows who?",
                    "type" : "network",
                    "filterYou": true,
                },
                {
                    "id": 2,
                    "text" : "Which person did you contact yourself, by taking the initiative?",
                    "type" : "noderow",
                    "filterYou": true,
                },
                {
                    "id": 3,
                    "text" : "Please indicate how often you have contact with these people.",
                    "type" : "linebox",
                    "filterYou": true,
                    "boxes" : [
                        {
                            "id": "Daily", 
                            "colour": "#AED6F1"
                        },
                        {
                            "id": "Several times a week",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "Once a week", 
                            "colour": "#C948F5"
                        },
                        {
                            "id": "Once a month",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "Less often",
                            "colour": "#AED6F1"
                        },
                    ]
                },
                {
                    "id": 4,
                    "text" : "Please indicate how often you have contact with this person, by clicking on the name, and dragging/dropping that contact into the appropriate category.",
                    "type" : "linebox",
                    "filterYou": true,
                    "boxes" : [
                        {
                            "id": "Partner", 
                            "colour": "#AED6F1"
                        },
                        {
                            "id": "Friend",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "Colleague", 
                            "colour": "#C948F5"
                        },
                        {
                            "id": "Health care",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "Professional",
                            "colour": "#AED6F1"
                        },
                        {
                            "id": "Family", 
                            "colour": "#C948F5"
                        },
                        {
                            "id": "Neighbour",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "Other",
                            "colour": "#AED6F1"
                        },
                    ]
                },
                {
                    "id": 5,
                    "text" : "Imagine you are in the middle, please indicate the age of your connections, as a little older than you (1 above), or much older than you (2 above), a little younger than you (1 below), much younger (2 below), or the same (also in the middle).",
                    "type" : "ladder",
                    "filterYou": true,
                    "boxes" : [
                        {
                            "id": "Much older", 
                            "colour": "#AED6F1"
                        },
                        {
                            "id": "A little older",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "Same age", 
                            "colour": "#C948F5"
                        },
                        {
                            "id": "A little younger",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "Much younger",
                            "colour": "#AED6F1"
                        },
                    ]
                },
            ]]
        )
    )
}