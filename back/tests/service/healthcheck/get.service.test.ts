import { getContainer } from "../../../src/container/index";
import { buildFastifyServer } from "../../../src/infrastructure/http/fastify";
import { buildAgnosticReads, buildAgnosticWrites } from "../../../src/infrastructure/http/agnostic";
import { silentLogger } from "../../utils/silentLogger";

describe("Healtcheck", () => {
  const dependencies = getContainer();
  const deps = {
    ...dependencies,
    logger: silentLogger
  }

  const agnosticReads = buildAgnosticReads(deps);
  const agnosticWrites = buildAgnosticWrites(deps);

  const app = buildFastifyServer({
    ...deps,
    agnosticReads,
    agnosticWrites
  });

  it("should return a status 200", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/healthcheck.get",
    });

    const jsonResponse = response.json();

    expect(response.statusCode).toBe(200);
    expect(jsonResponse).toMatchObject(      {
      status: "OK"
    });
  });

});