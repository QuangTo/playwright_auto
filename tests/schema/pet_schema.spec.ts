import { z } from "zod";
import { test, expect } from "@playwright/test";
import { schemas } from "../../src/api/Schema/zodSchema";
import { paths, components } from "../../src/api/Schema/openApiType";
/**
 * Sample link:
 * https://petstore31.swagger.io/api/v31/openapi.json
 * https://petstore3.swagger.io/api/v3/openapi.json
 */

const baseUrl = "https://petstore3.swagger.io/api/v3";

test("request,response,schema validation", async ({ request }) => {
  type PetPayloadRequest = components["schemas"]["Pet"];
  type PetResponse =
    paths["/pet"]["post"]["responses"]["200"]["content"]["application/json"];
  // define schema use lib
  const PetSchemaZod = schemas.Pet;
  /*
   or use zod to manully create schema
  */
  // const PetSchemaZod = z.object({
  //   id: z.number(),
  //   name: z.string(),
  //   category: z.object({
  //     id: z.number(),
  //     name: z.string(),
  //   }),
  //   photoUrls: z.array(z.string()),
  // });

  // create request data following schema type
  const testPet: PetPayloadRequest = {
    id: 123,
    name: "Dog",
    category: { id: 1, name: "Luna" },
    photoUrls: ["https://example.com/dog.jpg"],
    tags: [{ id: 1, name: "friendly" }],
    status: "available",
  };
  const res = await request.post(`${baseUrl}/pet`, {
    data: testPet,
  });
  const resBody = await res.json();
  const responseData: PetResponse = resBody;
  expect(res.status()).toBe(200);
  expect(responseData.id).toBe(testPet.id);
  // validate response
  PetSchemaZod.parse(resBody);
});
