import { program } from ".";

describe("Test cli command", () => {
  const commandNames: string[] = program.commands.map((command) => command.name());

  it("should have api subcommand", async () => {
    expect(commandNames).toContain("api");
  });

  it("should have generate-group subcommand", async () => {
    expect(commandNames).toContain("generate-group");
  });

  it("should have generate-all-groups subcommand", async () => {
    expect(commandNames).toContain("generate-all-groups");
  });

  it("should have make-groups-available subcommand", async () => {
    expect(commandNames).toContain("make-groups-available");
  });

  it("should have generate-openapi subcommand", async () => {
    expect(commandNames).toContain("generate-openapi");
  });
});
