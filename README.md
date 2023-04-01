# Activity Suggestor

## API Description

The API does ...........

### API Base URL

All URLs in the reference documentation use the following base URL:

```http://localhost:3000/api```

### API Resources

See API docs (/api/docs) for more information

#### Activity

Resource path: `/activity`

An **activity** object is a suggested activity a client might perform in the event they are bored. The activity object consists of a set of properties describing some relevant details about the activity.

- GET - Retrieving an activity

    Request:

        - HTTP Method: GET
        - Query Params: N/A

    Response:

      ```json
      {
        "activity": "Learn Express.js",
        "accessibility": 0.25,
        "type": "education",
        "participants": 1,
        "price": "0.1",
        "link": "https://expressjs.com/",
        "key": "3943506"
      } 
      ```

#### User

User resources ..............
