import { GlobalResolver } from "topics/resolver/global-resolver";

describe("Test global resolver", () => {
  const globalResolver = new GlobalResolver();
  const vaultAccounts = {
    "sismo-connect-app(appid=0xffe981d059744847a152d6917b93366a):0x1cf2599741742dd0b02b2816ae37e10bf61b1e5098a47f5562e66947e50e112f": 1,
    "sismo-connect-app(appid=0xffe981d059744847a152d6917b93366a):0x1cf2599741742dd0b02b2816ae37e10bf61b1e5098a47f5562e66947e50e112a": 1,
    "sismo-connect-app(appid=0xffe981d059744847a152d6917b93366b):0x1cf2599741742dd0b02b2816ae37e10bf61b1e5098a47f5562e66947e50e112b": 1,
  };

  it("Should resolve vaultIds", async () => {
    const res = await globalResolver.resolveAll(vaultAccounts);
    expect(res.accountSources).toEqual([
      "sismo-connect-app(appid=0xffe981d059744847a152d6917b93366a)",
      "sismo-connect-app(appid=0xffe981d059744847a152d6917b93366b)",
    ]);
    expect(res.resolvedIdentifierData).toEqual({
      "0x1cf2599741742dd0b02b2816ae37e10bf61b1e5098a47f5562e66947e50e112f": 1,
      "0x1cf2599741742dd0b02b2816ae37e10bf61b1e5098a47f5562e66947e50e112a": 1,
      "0x1cf2599741742dd0b02b2816ae37e10bf61b1e5098a47f5562e66947e50e112b": 1,
    });
    expect(res.updatedRawData).toEqual({
      "sismo-connect-app(appid=0xffe981d059744847a152d6917b93366a):0x1cf2599741742dd0b02b2816ae37e10bf61b1e5098a47f5562e66947e50e112f": 1,
      "sismo-connect-app(appid=0xffe981d059744847a152d6917b93366a):0x1cf2599741742dd0b02b2816ae37e10bf61b1e5098a47f5562e66947e50e112a": 1,
      "sismo-connect-app(appid=0xffe981d059744847a152d6917b93366b):0x1cf2599741742dd0b02b2816ae37e10bf61b1e5098a47f5562e66947e50e112b": 1,
    });
  });
});
