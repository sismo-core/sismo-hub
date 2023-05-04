import { formatUsers } from ".";

describe("Test rhinofi power users generator", () => {
  it("should return object of the correct type", async () => {

    const testContext = { timestamp: 12345 };
    const testResponse = [
        { ethAddress: "hello", active_weeks: 2 },
        { ethAddress: "world", active_weeks: 3 }];

    expect(await formatUsers(testContext, testResponse)).toEqual([{
        "accountSources": ["ethereum"],
        "data": {"hello": 1, "world": 1},
        "description": "Active users of Rhino.Fi app since May 2021",
        "name": "rhinofi-power-users",
        "specs": "You must be a repeat user of Rhino.Fi after 21st May 2021 to be eligible for this badge.",
        "tags": ["User"],
        "timestamp": 12345,
        "valueType": "Score"}]
    );
  });
});
