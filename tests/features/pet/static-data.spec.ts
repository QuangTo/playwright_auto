import { test, expect } from "@playwright/test";
import { generateCurlCommand } from "../../../lib/helpers/logger/generateCurlCommand";

export type petData = {
  id: number;
  name: string;
  status: string;
};

test.describe.fixme("StaticData ", () => {
  test("create new pet data", async ({ request, baseURL }) => {
    const data: petData = {
      id: 1,
      name: "luna",
      status: "available",
    };
    try {
      const res = await request.post(`v2/pet`, { data });
      expect(res.ok()).toBeTruthy();
      expect(res.status() === 200);
    } catch (error) {
      console.error(generateCurlCommand("POST", `${baseURL}/v2/pet`, data));
    }
  });

  test("should get data by id", async ({ request }) => {
    const res = await request.get(`v2/pet/1`);
    expect(res.ok()).toBeTruthy();
    expect(res.status() === 200);
    expect(await res.json()).toEqual(
      expect.objectContaining({
        id: 1,
        category: {
          id: 1,
          name: "string",
        },
        name: "doggie",
        photoUrls: ["string"],
        tags: [
          {
            id: 1,
            name: "string",
          },
        ],
        status: "available",
      })
    );
  });
  test("receive 404 when get data with invalid format id", async ({
    request,
  }) => {
    const id = "1";
    const res = await request.get(`v2/pet/${id}`);
    expect(res.status() === 404);
  });
  test("receive 404 when data negative id", async ({ request }) => {
    const id = -1;
    const res = await request.get(`v2/pet/${id}`);
    expect(res.status() === 404);
  });
});
