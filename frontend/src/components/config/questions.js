export default function getQuestions() {
    return (
        ([
            {
                surveyId: "FIRST_Test-Imke",
                upperBoundNodes: 10,
                lowerBoundNodes: 5,
            },
            [
                {
                    "id": 1,
                    "text" : "Who knows who? Please click on the nodes that are known to the central person",
                    "type" : "network",
                    "filterYou": true,
                },
                {
                    "id": 2,
                    "text" : "Which person did you contact yourself during the past week, by taking the initiative?",
                    "type" : "noderow",
                    "filterYou": true,
                },
                {
                    "id": 3,
                    "text" : "Please indicate how often you have contact with these people, by dragging and dropping the names in the appropriate boxes.",
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
                    "text" : "Please indicate your relation with this person, by clicking on the name, and dragging/dropping that contact into the appropriate category.",
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
                    "text" : "Imagine you are in the middle, please indicate the age of your connections, as a little older than you (max 2 years older;1 above), or much older than you (2 above), a little younger than you (max 2 years younger; 1 below), much younger (2 below), or the same (also in the middle).",
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

		{
                    "id": 6,
                    "text" : " Where did you meet this person?",
                    "type" : "linebox",
                    "filterYou": true,
                    "boxes" : [
                        {
                            "id": "At school", 
                            "colour": "#AED6F1"
                        },
                        {
                            "id": "At university/higher educational institute",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "At work", 
                            "colour": "#C948F5"
                        },
                        {
                            "id": "During sports",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "During recreation",
                            "colour": "#AED6F1"
                        },
                        {
                            "id": "Other",
                            "colour": "#C948F5"
                        },
			{
                   	    "id": 7,
                    	    "text" : "Which person do you consider as a very close or best friend?",
                    	    "type" : "noderow",
                    	    "filterYou": true,
                	},

                    ]
                },
			{
                    "id": 8,
                    "text" : "Imagine you are in the middle, please indicate the Social Economic Status of your connections.",
                    "type" : "ladder",
                    "filterYou": true,
                    "boxes" : [
                        {
                            "id": "Much higher SES", 
                            "colour": "#AED6F1"
                        },
                        {
                            "id": "A little higher SES",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "Same SES", 
                            "colour": "#C948F5"
                        },
                        {
                            "id": "A little lower SES",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "Much lower SES",
                            "colour": "#AED6F1"
                        },
                    ]
                },



            ]]
        )
    )
}