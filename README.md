# Chore Tracker team

## All Endpoints should include this :

-- https://chore-tracker1.herokuapp.com




                                 
   # Register Parent
   
  ### EndPoint :




| Method        | EndPoint           | 
| ------------- |:-------------:| 
| POST      | api/auth/register|



                        
                                                              
  ### New Parent Object: 
   
   
   
   
   | field        | metadata           | 
   | -------------|:-------------:| 
   |   fname    |  Required   |
   |   lname    |  Required   |
   |    email       |  Required and Unique |
   |  username   | Required and Unique
   |   password    |  Required   |
   

  ### New Child Object: 
   
   
   
   
   | field        | metadata           | 
   | -------------|:-------------:| 
   |   fstname    |  Required   |
   |   lstname    |  Required   |
   |   username    |  Required   |
   |   password    |  Required   |
   |   parent_id   |  Required   |

   

  ### EndPoint :


| Method        | EndPoint              | 
| ------------- |:-------------:| 
| POST      | api/auth/register/child |

   
                       
   
  ### Login Parent Object: 
   
   
   
   | field        | metadata           | 
   | -------------|:-------------:| 
   | username     |     Required  | 
   | password     |     Required   |


   ### EndPoint
   
   
   Method        |           EndPoint
   | -------------|:-------------:| 
   | POST         |  api/auth/login|


   ### Login Child Object: 
   
   
   
   | field        | metadata           | 
   | -------------|:-------------:| 
   | username     |     Required  | 
   | password     |     Required   |


   ### EndPoint
   
   
   Method        |           EndPoint
   | -------------|:-------------:| 
   | POST         |  api/auth/login/child|
   
   
 # APIs with authorization:
 
 ### must LogIn and have a token to make these requests:
 
 
 
 
 
  Method        |       EndPoint | Description
 | -------------|:-------------:| ----------|
 | GET         |  api/chore |  get all chores
 | GET         |  api/auth/child/:id  | gets chores for child by id
 | GET         |  api/auth/child/justchild/:id  | gets details for child by id
 | GET         |  api/auth/parent/:id | gets children for parent id 
  | GET         |  api/auth/parent/justparent/:id | gets parent details by id
 | POST         |  api/chore|  add new chore
 
  
  
  
  ### Chore Object:
  
  
  | field        | metadata           | 
   | -------------|:-------------:| 
   |  name        | Required 
   |   description       |  Required  |
   |   Comments   |        |
   |   Completed      |        |
   |   due_date   |         |
   |   chore_score    |   Required  |
   |   bonus_pts    |       |
   |   clean_strk  |        |
   |   photo_obj   |      |
   |   child_id   |  Required     |
   |   parent_id   |  Required    |
   
  


   




 
## Update/Delete 

 
 
 
 Method        |       EndPoint | Description
 | -------------|:-------------:| ----------|
 | PUT         |  api/chore/:id |  Update chore
 | DELETE         |  api/chore/:id |   Delete chore
 | PUT         |  api/auth/child/:id |  Update child
 | DELETE         |  api/auth/child/:id |   Delete child
 | PUT         |  api/auth/parent/:id |  Update parent
 | DELETE         |  api/auth/parent/:id |   Delete parent

  ### Seeded Database users for tests:
  
  
  | Child Users       | Child Passwords   | 
   | -------------|:-------------:| 
   |  joshd       | test1     |
   |   myboy       |  test2  |
   |  vinnyv     |   test3        |
   |   test7      |   test8     |


   |   Parents    |  Passwords       |
   | -------------|:-------------:| 
   |   hideout    |   gourmetcafe  |
   |   jules    |   badmofo    |
   |   gunman  |  junkie      |
   |  test4   |   test5    |
  


### BackEnd Built with Node.js
   ### Libraries:
   * express
   * knex
   * bcryptjs
   * jsonwebtoken