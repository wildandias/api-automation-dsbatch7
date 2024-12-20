const { test, expect } = require("playwright/test");
const { Ajv } = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);


test("Test Case GET", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");

  expect(response.status()).toBe(200);

  const responseData = await response.json();

  expect(responseData.data.id).toBe(2);
  expect(responseData.data.email).toBe("janet.weaver@reqres.in");
  expect(responseData.data.first_name).toBe("Janet");
  expect(responseData.data.last_name).toBe("Weaver");
  expect(responseData.data.avatar).toContain("https://reqres.in/img/faces/2-image.jpg");

  const schema = require("./jsonschema/get-object-schema.json");
  const isValid = ajv.validate(schema, responseData);

  if (!isValid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
  }

  // Pastikan schema valid
  expect(isValid).toBe(true);
});

// expect(response.status()).toBe(200)

//test('Test Case 3', async ({ page }) => {

//});
