export default function getQuestions() {
    return (
        [
            {
                "id": 1,
                "text" : "How do you like them",
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
                "text" : "Do you think you're egocentric?",
                "type" : "mcq",
                "boxes" : [
                    {
                        "id": "a lot", 
                    },
                    {
                        "id": "somehow",
                    },
                    {
                        "id": "not much", 
                    },
                    {
                        "id": "not at all",
                    },
                ]
            },
            {
                "id": 3,
                "text" : "waddup without correct type",
                "type" : "",
                "boxes" : []
            },
            {
                "id": 4,
                "text" : "waddup with correct type(select)",
                "type" : "select",
                "boxes" : []
            }
        ]
    )
}