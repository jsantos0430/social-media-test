# social-media-test

<blockquote><p>Practice of the backend using nodejs</p></blockquote>

<h2>Installation</h2>

In order to execute the project you need to follow the steps:

<h6> 1 - clone the repository: git clone git@github.com:jsantos0430/social-media-test.git</h6>

<h6> 2 - create the .env file at the root of the project and place the variables found in the .env.example file.</h6>
<h6><b> Example:</b></h6>
<code>
    PORT=8080
    DB_URL="mongodb://127.0.0.1:27017/social_media_test_db"
    DB_URL_TEST="mongodb://127.0.0.1:27017/social_media_mock_test_db"
    NODE_ENV=development
    TOKEN_API=""
</code>

<h6> 3 - Obtain the necessary libraries for the project by generating the node \_modules folder: npm install.</h6>

<h6> 4 - You need to install and run local redis, example: sudo apt-get install redis-server</h6>

<h2>API</h2>

<h6> To test the API use a platform like Postman, below I leave the APIs we have.</h6>

<h6>1 - POST /api/profiles/create => create some profile (Below is the data structure of a profile).</h6>
<h6>2 - PUT /api/profiles/:id => Update a profile.</h6>
<h6>3 - GET /api/profiles/:id => Get a specific profile.</h6>
<h6>4 - GET /api/profiles/all-friends/:id => Get all friends of a profile.</h6>
<h6>5 - DELETE /api/profiles/:id => delete a profile.</h6>
<h6>6 - POST /profiles/shotest-relationship-between-profiles => get the shortest relationship between profiles.</h6>

-----
<h6>7 - POST /api/profiles/seeder => create the initial data.</h6>

<blockquote>
    <h6>WARNING:</h6>
        This endpoint is an alternative that we can use to create profiles and relations 
        but it has a maximum of profile (100). 
    We recommed using command.
</blockquote>

<h6>Example:</h6>

```bash
npm run seed profiles <number_of_profiles> <max_of_relationship>
```

<h6>Example Seed Test:</h6>

```bash
npm run seed-test profiles <number_of_profiles> <max_of_relationship>
```

<h6>REMEMBER: To add the token place it as a variable in the header. </h6>
<h6>example: </h6>

<code>authorization:aTeGATITURgIgraNTive</code>

<h2>Tests</h2>

<blockquote>
    <h6>WARNING:</h6>
        The appropriate command must be used as it sets the necessary environment variables for testing only.
</blockquote>

<h6>example: </h6>

```bash
npm run test
```

<h2>Structure of a profile</h2>
<code>
    {
        "id": 6,
        "img":
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=comp
        ress&cs=tinysrgb&dpr=1&w=500",
        "first_name": "Steph",
        "last_name": "Walters",
        "phone": "(820) 289-1818",
        "address": "5190 Center Court Drive",
        "city": "Spring",
        "state": "TX",
        "zipcode": "77370",
        "available": true
    }
</code>
