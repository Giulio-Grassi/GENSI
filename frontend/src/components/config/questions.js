export default function getQuestions() {
    return (
        (
            {
                "surveyId": "SE88301",
                "upperBoundNodes" : 2,
                "lowerBoundNodes" : 3,
                //means we must have at least 2 nodes and at maximum 3 nodes in the survey.
            },
            [
                {
                    "id": 1,
                    "text" : "do you like them",
                    "type" : "ladder",
                    "filterYou": true,
                    "boxes" : [
                        {
                            "id": "Like a lot", 
                            "colour": "#AED6F1"
                        },
                        {
                            "id": "Like somehow",
                            "colour": "#E74C3C"
                        },
                        {
                            "id": "Like a little less", 
                            "colour": "#C948F5"
                        },
                        {
                            "id": "Don't like",
                            "colour": "#E74C3C"
                        },
                    ]
                },
                {
                    "id": 2,
                    "text" : "who do you like",
                    "type" : "noderow",
                },
            ]
        )
    )
}