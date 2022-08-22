import { program } from ".";

describe("Test cli command", () => {
  const commandNames: string[] = program.commands.map((command) =>
    command.name()
  );

  it("should have api subcommand", async () => {
    expect(commandNames).toContain("api");
  });

  it("should have generate-group subcommand", async () => {
    expect(commandNames).toContain("generate-group");
  });

  it("should have compute-attester subcommand", async () => {
    expect(commandNames).toContain("compute-attester");
  });

  it("should have generate-openapi subcommand", async () => {
    expect(commandNames).toContain("generate-openapi");
  });
});
