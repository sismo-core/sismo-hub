import {LensProvider} from ".";

describe("Test Lens profile id resolver", () => {
  const provider = new LensProvider();
  it("should resolve lens profile id from handle", async () => {
    const profileId = await provider._getProfileIdFromAnySources("sismo.lens");
    expect(profileId).toBe("0x26e5");
  });
  it("should resolve lens profile id from ethereum account", async () => {
    const profileId = await provider._getProfileIdFromAnySources("0xB0A179C459484885D1875009110F3cE3064867B9");
    expect(profileId).toBe("0x26e5");
  });
  it("should resolve lens profile id from ens", async () => {
    const profileId = await provider._getProfileIdFromAnySources("vitalik.eth");
    expect(profileId).toBe("0x0187b3");
  });
  it("should resolve lens profile id from profile id", async () => {
    const profileId = await provider._getProfileIdFromAnySources("0x26e5");
    expect(profileId).toBe("0x26e5");
  });
});