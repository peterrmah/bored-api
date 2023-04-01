# Activity Suggestor

## API Description

The API does ...........

## API Base URL

All URLs in the reference documentation use the following base URL:

`http://localhost:3000/api`

## API Resources

See API docs (/api/docs) for more information

### Activity

Resource path: `/activity`

An **activity** object is a suggested activity a client might perform in the event they are bored. The activity object consists of a set of properties describing some relevant details about the activity.

#### GET - Retrieving an activity

Request:

    - HTTP Method: GET
    - Query Params: N/A

Example Response:

    {
      "activity": "Learn Express.js",
      "accessibility": "High",
      "type": "education",
      "participants": 1,
      "price": "Low",
      "link": "https://expressjs.com/",
      "key": "3943506"
    }

Note: Returns activity recommendation for the **latest** saved user. If none exist, response does not consider user profile in recommendation.

### User

Resource path: `/user`

A User profile is a representation of a user's preferences.

#### POST - Creating a User profile

Request:

    - HTTP Method: POST
    - Body:
      {
        "name": string,
        "accessibility": "High" | "Medium" | "Low",
        "price": "Free" | "Low" | "High"
      }

Example Response:

    {
      "name": "Jimothy",
      "accessibility": "High",
      "price": "Free"
    }
