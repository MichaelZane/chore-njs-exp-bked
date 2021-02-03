const server = require("./server")
const request = require('supertest')
process.env.DB_ENV = "test"

describe('the environment', function() {
    it('should use the testing environment', function() {
        expect(process.env.DB_ENV).toBe('test')
    })
})

describe('server', function() {
    it('runs the test', function() {
        expect(true).toBe(true)
    })
})

describe('GET /', function() {
    it('it should return 200', function() {

        return request(server).get('/')
        .then(res => {

            expect(res.status).toBe(200)
        })
    })
    it('it should JSON', function() {

        return request(server).get('/')
        .then(res => {

            expect(res.type).toMatch(/json/i)
        })

    })
})
// register and log in parent

let testReg = {
    fname: "testFname",
    lname: "testLname",
    email: "testEmail@test.com",
    username: "testUsername",
    password: "testPassword",
}

describe('POST /api/auth/register', () => {
    
    it('testing already exists parent', async() => {
        const res = await request(server)
            .post('/api/auth/register')
            .send(testReg)
                       
        expect(res.status).toBe(500)
                   
    })
})

let testLogin = { 
    username: "testUsername",
    password: "testPassword",
}

describe('POST /api/auth/login', () => {
    
    it('test parent login', async() => {
        const res = await request(server)
            .post('/api/auth/login')
            .send(testLogin)

        expect(res.status).toBe(200)
                        
    })
})

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

        expect(res.status).toBe(500)
           

            
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

  describe("GET /api/parent/1", () => {
    let child = { username: "hideout", password: "gourmetcafe" };
    it("testing child Login", () => {
      return request(server)
        .post("/api/auth/login")
        .send(child)
        .expect(200)
        .then(res => {
          const token = res.body.token;
          return request(server)
            .get("/api/auth/parent/1")
            .set("authorization", token)
            .then(res => {
              expect(res.status).toBe(200);
              
            });
        });
    });
  });
