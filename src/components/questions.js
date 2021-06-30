export default function getQuestions() {
    return (
        [
            {
                "id": 1,
                "text" : "Who do you prefer",
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
                "id": 2,
                "text" : "Who is egocentric",
                "type" : "select",
                "boxes" : []
            },
            {
                "id": 3,
                "text" : "waddup",
                "type" : "",
                "boxes" : []
            }
        ]
    )
}