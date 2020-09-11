Please use POSTMAN Collection file (Tests_Homework_2.postman_collection.json) to test responses:

+--------+-------------------------+---------------------------------------------------------------+
  Method | URI                     |Comments
+--------+-------------------------+---------------------------------------------------------------+
  GET    | /                       |get available routes
  POST   | /users/createUser       |create new user
  GET    | /users/:id              |get user by id
  GET    | /users/                 |get all users
  PUT    | /users/updateUser/:id   |change login and age
  PUT    | /users/deleteUser/:id   |change isDeleted for user testuser1 to true
  PUT    | /users/test/2           |get list of 2 users with string 'test' in login sorted by name
+--------+-------------------------+---------------------------------------------------------------+

or check results in Tests_Homework_2.postman_test_run.json

Run server by typing: 'npm run task1' in the console