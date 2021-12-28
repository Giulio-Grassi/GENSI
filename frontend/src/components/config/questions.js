export default function getQuestions() {
    return (
        [
            {
                "id": 1,
                "text" : "MANNAGGIAN A DIO do you like them",
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
                "type" : "network",
                "boxes" : []
            },
            {
                "id": 3,
                "text" : "MANNAGGIAN A DIO do you like them",
                "type" : "dragndrop",
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
                "id": 4,
                "text" : "waddup with correct type(select)",
                "type" : "select",
                "boxes" : []
            }
        ]
    )
}