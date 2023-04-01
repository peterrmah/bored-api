# Activity Suggestor

## API Description

The API does ...........

## API Base URL

All URLs in the reference documentation use the following base URL:

`http://localhost:3000/api`

## API Resources

See API docs (/api/docs) for more information

### Activity (`/activity`)

An **activity** object is a suggested activity a client might perform in the event they are bored. The activity object consists of a set of properties describing some relevant details about the activity.

#### GET - Retrieving an activity

Request:

    - HTTP Method: GET
    - Query Parameters: N/A

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

where:

- **activity**: Description of the queried activity
- **accessibility**: A factor describing how possible an event is to do with "High" being the most accessible ["Low", "Medium", "High"]
- **type**: Type of activity ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
- **participants**: The number of people that this activity could involve [0, n]
- **price**: A factor describing the cost of the event ["Free", "Low", "High"]
- **link**: Relevant webpage links to learn more about the activity
- **key**: A unique numeric id

Note: Returns activity recommendation for the **latest** saved user. If none exist, response does not consider user profile in recommendation.

### User (`/user`)

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

where:

- **name**: The user's name
- **accessibility**: Preferred level of accessibility ["Low", "Medium", "High"]
- **price**: Preferred pricing ["Free", "Low", "High"]

Example Response:

    {
      "id": "b65c3d0b-ceda-4f75-a8c9-3416fe0178e5",
      "name": "Jimothy Shrute",
      "accessibility": "High",
      "price": "Free",
      "created_at": "2023-04-01T03:23:29.383Z"
    }

where:

- **id**: User's unique ID
- **created_at**: Datetime stamp in which the user entity was created (in ISO-8601 format)
