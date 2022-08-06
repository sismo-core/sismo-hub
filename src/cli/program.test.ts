import { program } from ".";

describe("Test cli command", () => {
  const commandNames: string[] = program.commands.map((command) =>
    command.name()
  );

  it("should have generate-group subcommand", async () => {
    expect(commandNames).toContain("generate-group");
  });

  it("should have api subcommand", async () => {
    expect(commandNames).toContain("api");
  });
});
