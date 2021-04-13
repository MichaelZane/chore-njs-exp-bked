// const server = require("../api/server")
// const request = require('supertest')
// const db = require('../database/dbConfig');

// afterAll(() => {
//     db.cleanUp();
//   });

// // register and log in parent

// let testReg = {
//     fname: "testFname",
//     lname: "testLname",
//     email: "testEmail@test.com",
//     username: "testUsername",
//     password: "testPassword",
// }

// describe('POST /api/auth/register', () => {

//     beforeEach(() => {
//         return db.migrate.rollback("users").then(() => db.migrate.latest("users"));
//       });
    
//     it('testing adding a parent', async() => {
//         const res = await request(server)
//             .post('/api/auth/register')
//             .send(testReg)
                       
//         expect(res.status).toBe(201)
                   
//     })
// })

// let testLogin = { 
//     username: "testUsername",
//     password: "testPassword",
// }

// describe('POST /api/auth/login', () => {
    
//     it('test parent login', async() => {
//         const res = await request(server)
//             .post('/api/auth/login')
//             .send(testLogin)

//         expect(res.status).toBe(200)
                        
//     })
// })

// describe("GET /api/parent/1", () => {
//     let child = { username: "hideout", password: "gourmetcafe" };
//     it("testing child Login", () => {
//       return request(server)
//         .post("/api/auth/login")
//         .send(child)
//         .expect(200)
//         .then(res => {
//           const token = res.body.token;
//           return request(server)
//             .get("/api/auth/parent/1")
//             .set("authorization", token)
//             .then(res => {
//               expect(res.status).toBe(200);
              
//             });
//         });
//     });
//   });

describe('server', function() {
    it('runs the test', function() {
        expect(true).toBe(true)
    })
})