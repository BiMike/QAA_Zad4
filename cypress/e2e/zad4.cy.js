describe("API Tests for site: https://httpbin.org", () => {
  //Info of site: https://httpbin.org/#/

  // ************************************************************
  it("Test GET 1 - correct url", () => {
    //cy.pause();
    cy.request({
      method: "GET",
      url: `https://httpbin.org`,
    }).as("req1");

    cy.get("@req1").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // ************************************************************

  it("Test GET 2 - incorrect url", () => {
    cy.request({
      //   method: "GET",
      url: `https://httpbin.org/aa`,
      failOnStatusCode: false,
    }).as("req2");

    cy.get("@req2").then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  // ************************************************************

  it("Test GET 3 -property:url", () => {
    cy.request({
      method: "GET",
      url: `https://httpbin.org/get`,
    }).as("req3");

    cy.get("@req3").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("url");
    });
  });

  // ************************************************************

  it("Test not allowed Method", () => {
    cy.request({
      method: "POST",
      url: `https://httpbin.org/get`,
      failOnStatusCode: false,
    }).as("req4");

    cy.get("@req4").then((response) => {
      expect(response.status).to.eq(405);
    });
  });

  // ************************************************************

  it("Test POST", () => {
    cy.request({
      method: "POST",
      url: `https://httpbin.org/post`,
    }).as("req5");

    cy.get("@req5").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // ************************************************************
  const bodyData = {
    name: "Mike",
    lastname: "Mike2",
  };

  it("Test POST 2", () => {
    cy.request({
      method: "POST",
      url: `https://httpbin.org/post`,
      json: bodyData,
    }).as("req6");

    cy.get("@req6").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.deep.eq(bodyData);
    });
  });

  // ************************************************************

  it("Test PUT", () => {
    cy.request({
      method: "PUT",
      url: `https://httpbin.org/put`,
    }).as("req7");

    cy.get("@req7").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // ************************************************************

  it("Test DELETE", () => {
    cy.request({
      method: "DELETE",
      url: `https://httpbin.org/delete`,
    }).as("req8");

    cy.get("@req8").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // ************************************************************

  it("Test HEADERS", () => {
    cy.request({
      method: "GET",
      url: `https://httpbin.org/headers`,
      headers: {
        "User-Agent": "Firefox/112.0",
      },
    }).as("req9");

    cy.get("@req9").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers["User-Agent"]).to.eq("Firefox/112.0");
    });
  });

  // ************************************************************

  it("Test HEADERS 2", () => {
    cy.request({
      method: "GET",
      url: "https://httpbin.org/headers",
      headers: {
        "Test-Header": "My Test Header",
      },
      failOnStatusCode: false,
    }).as("req10");

    cy.get("@req10").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers["Test-Header"]).to.eq("My Test Header");
    });
  });

  //   // ************************************************************

  it("Test Args", () => {
    cy.request({
      method: "GET",
      url: `https://httpbin.org/get`,
      qs: {
        arg_1: "test arg1",
        arg_2: "test arg2",
      },
    }).as("req11");

    cy.get("@req11").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.args.arg_1).to.eq("test arg1");
      expect(response.body.args.arg_2).to.eq("test arg2");
    });
  });

  //   // ************************************************************

  it("Test response duration", () => {
    cy.request({
      method: "GET",
      url: `https://httpbin.org/delay/2`,
    }).as("req12");

    cy.get("@req12").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.greaterThan(1000);
    });
  });

  // ************************************************************

  it("Test random param", () => {
    const random = Math.floor(Math.random() * 1000);
    cy.request({
      method: "GET",
      url: "https://httpbin.org/get",
      qs: {
        num: random,
      },
    }).as("req13");

    cy.get("@req13").then((response) => {
      expect(response.status).to.eq(200);
      expect(parseInt(response.body.args.num)).to.eq(random);
    });
  });

  //   // ************************************************************

  it("Test Dynamic Data - base64", () => {
    cy.request({
      method: "GET",
      url: "https://httpbin.org/base64/R29JVCBNaWNoYWwgQnJ6b3pvd3NraQ==",
    }).as("req14");

    cy.get("@req14").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq("GoIT Michal Brzozowski");
    });
  });

  //   // ************************************************************
});
