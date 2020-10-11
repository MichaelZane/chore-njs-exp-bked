const server = require("./server")
const request = require('supertest')
const router = require('../auth/auth-router')


describe('the environment', function() {
    it('should use the testing environment', function() {
        expect(process.env.DB_ENV).toBe('testing')
    })
})

describe('server', function() {
    it('runs the test', function() {
        expect(true).toBe(true)
    })
})

describe('GET /', function() {
    it('it should return 200', function() {
        // make a get request to 
        //when testing an api ALWAYS return the request to the server
        return request(server).get('/')
        .then(res => {
            // check that the status code is 200
            expect(res.status).toBe(200)
        })
    })
    it('it should JSON', function() {
        // make a get request to 
        //when testing an api ALWAYS return the request to the server
        return request(server).get('/')
        .then(res => {
            // check that the status code is 200
            expect(res.type).toMatch(/json/i)
        })

    })
})
// register and log in parent

describe('POST /api/auth/register', () => {
    let parent = {
        fname: "test0",
        lname: "test0",
        email: "0test@test0.com",
        username: "test00",
        password: "test000",
    }
    it('testing already exists parent', () => {
        return request(server).post('/api/auth/register').send(parent)
            .then(res => {            
            expect(res.status).toBe(500)
           
            })
            
    })
})

describe('POST /api/auth/login', () => {
    let parent = { 
        username: "test00", 
        password: "test000"
    }
    it('test parent login', () => {
        return request(server).post('/api/auth/login').send(parent)
            .then(res => {
                
                expect(res.status).toBe(200)
            
            })
                        
    })
})

// register and log in child

describe('POST /api/auth/register/child', () => {
    let parent = {
        fstname: "test0",
        lstname: "test0",
        username: "test00",
        password: "test000",
    }
    it('testing already exists child', () => {
        return request(server).post('/api/auth/register/child').send(parent)
            .then(res => {            
            expect(res.status).toBe(500)
           
            })
            
    })
})

describe('POST /api/auth/login/child', () => {
    let parent = { 
        username: "test00", 
        password: "test000"
    }
    it('test child login', () => {
        return request(server).post('/api/auth/login/child').send(parent)
            .then(res => {
                const token = res.body.token
                expect(res.body.token).toBe(token)
                expect(res.status).toBe(200)
            
            })                        
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
