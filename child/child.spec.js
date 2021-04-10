const server = require("../api/server")
const request = require('supertest')


// register and log in child
let testChild = {
    fstname: "fstnameTest",
    lstname: "lstnameTest", 
    username: "usernameTest",
    password: "passwordTest",
    
}

describe('POST /api/auth/register/child', () => {
    
    it('testing already exists child', async() => {
        const res = await request(server)
            .post('/api/auth/register/child')
            .send(testChild) 

        expect(res.status).toBe(201)            
    })
})

describe('POST /api/auth/login/child', () => {
    let testChildLogin = { 
        username: "usernameTest",
        password: "passwordTest"
    }
    it('test child login', async() => {
        const res = await request(server)
            .post('/api/auth/login/child')
            .send(testChildLogin)

        const token = res.body.token
        expect(res.body.token).toBe(token)
        expect(res.status).toBe(200)
                                 
    })

})
// child getting an array of chores for his id

describe("GET /api/chore", () => {
    let child = { username: "joshd", password: "test1" };
    it("testing child Login", () => {
      return request(server)
        .post("/api/auth/login/child")
        .send(child)
        .expect(200)
        .then(res => {
          const token = res.body.token;
          return request(server)
            .get("/api/auth/child/1")
            .set("authorization", token)
            .then(res => {
              expect(res.status).toBe(200);
              
            });
        });
    });
});