export default function getQuestions() {
    return (
        [
            {
                "id": 1,
                "text" : "Starting at the first contact, please indicate if this person knows the other persons you have listed. Then do the same for your second contact, etc.",
                "type" : "network",
            },
            {
                "id": 2,
                "text" : "do you like them",
                "type" : "ladder",
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
                "id": 3,
                "text" : "who do you like",
                "type" : "noderow",
            },
        ]
    )
}