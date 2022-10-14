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

  it("should have generate-all-groups subcommand", async () => {
    expect(commandNames).toContain("generate-all-groups");
  });

  it("should have send-to-attester subcommand", async () => {
    expect(commandNames).toContain("send-to-attester");
  });

  it("should have generate-openapi subcommand", async () => {
    expect(commandNames).toContain("generate-openapi");
  });

  it("should have migrate-groups subcommand", async () => {
    expect(commandNames).toContain("migrate-groups");
  });
});
