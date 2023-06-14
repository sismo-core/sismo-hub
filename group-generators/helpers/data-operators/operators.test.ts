import { UnionOption } from "./union";
import { dataOperators } from ".";
import { FetchedData } from "topics/group";

const fetchedGroupOne: FetchedData = {
  "0x1": 1,
  "0x2": 1,
  "0x3": 3,
  "0x4": 4
};

const fetchedGroupTwo: FetchedData = {
    "0x1": 2,
    "0x2": 2,
    "0x3": 2,
    "0x5": 5
};

describe("Test data operators", () => {
  let finalGroup: FetchedData;

  it("should create a Union Group with max values", async () => {
    // ascendant
    finalGroup = dataOperators.Union([fetchedGroupOne, fetchedGroupTwo])
    expect(finalGroup).toEqual(
        {
            "0x1": 2,
            "0x2": 2,
            "0x3": 3,
            "0x4": 4,
            "0x5": 5
          }
    );

    // descendant
    finalGroup = dataOperators.Union([fetchedGroupTwo, fetchedGroupOne])
    expect(finalGroup).toEqual(
        {
            "0x1": 2,
            "0x2": 2,
            "0x3": 3,
            "0x4": 4,
            "0x5": 5
          }
    );
  });

  it("should create a Union Group with min values", async () => {
    // ascendant
    finalGroup = dataOperators.Union([fetchedGroupOne, fetchedGroupTwo], UnionOption.Min)
    expect(finalGroup).toEqual(
        {
            "0x1": 1,
            "0x2": 1,
            "0x3": 2,
            "0x4": 4,
            "0x5": 5
          }
    );

    // descendant
    finalGroup = dataOperators.Union([fetchedGroupTwo, fetchedGroupOne], UnionOption.Min)
    expect(finalGroup).toEqual(
        {
            "0x1": 1,
            "0x2": 1,
            "0x3": 2,
            "0x4": 4,
            "0x5": 5
          }
    );
  });

  it("should create a Union Group with min values", async () => {
    // ascendant
    finalGroup = dataOperators.Union([fetchedGroupOne, fetchedGroupTwo], UnionOption.Max)
    expect(finalGroup).toEqual(
        {
            "0x1": 2,
            "0x2": 2,
            "0x3": 3,
            "0x4": 4,
            "0x5": 5
          }
    );

    // descendant
    finalGroup = dataOperators.Union([fetchedGroupTwo, fetchedGroupOne], UnionOption.Sum)
    expect(finalGroup).toEqual(
        {
            "0x1": 2,
            "0x2": 2,
            "0x3": 3,
            "0x4": 4,
            "0x5": 5
          }
    );
  });

  it("should create a Union Group with min values", async () => {
    // ascendant
    finalGroup = dataOperators.Union([fetchedGroupOne, fetchedGroupTwo], UnionOption.Sum)
    expect(finalGroup).toEqual(
        {
            "0x1": 3,
            "0x2": 3,
            "0x3": 5,
            "0x4": 4,
            "0x5": 5
          }
    );

    // descendant
    finalGroup = dataOperators.Union([fetchedGroupTwo, fetchedGroupOne], UnionOption.Sum)
    expect(finalGroup).toEqual(
        {
            "0x1": 3,
            "0x2": 3,
            "0x3": 5,
            "0x4": 4,
            "0x5": 5
          }
    );
  });

  it("should map group addresses to a chosen value", async () => {
    // ascendant
    finalGroup = dataOperators.Map(fetchedGroupOne, 11)
    expect(finalGroup).toEqual(
        {
            "0x1": 11,
            "0x2": 11,
            "0x3": 11,
            "0x4": 11,
          }
    );
  });

  it("should map group addresses to chosen thresholds", async () => {
    // ascendant
    finalGroup = dataOperators.Map(fetchedGroupOne, undefined, [{min: 3, newValue: 12}])
    expect(finalGroup).toEqual(
        {
            "0x3": 12,
            "0x4": 12,
          }
    );
  });

  it("should create an intersection for a specific value", async () => {
    // ascendant
    finalGroup = dataOperators.Intersection(fetchedGroupOne, fetchedGroupTwo, {intersectionValue: 4})
    expect(finalGroup).toEqual(
        {
            "0x1": 4,
            "0x2": 4,
            "0x3": 4,
        }
    );
  });

  it("should select only group addresses of a chosen value", async () => {
    // ascendant
    finalGroup = dataOperators.Filter(fetchedGroupOne, 3)
    expect(finalGroup).toEqual(
        {
            "0x3": 3,
        }
    );
  });


});
