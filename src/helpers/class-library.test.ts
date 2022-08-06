import { ClassLibrary } from "./class-library";

abstract class TestAbstract {
  abstract value: string;
  get(): string {
    return this.value;
  }
}

class TestA extends TestAbstract {
  value = "TestA";
}
class TestB extends TestAbstract {
  value = "TestB";
}

describe("test class library", () => {
  const library = new ClassLibrary<TestAbstract>({
    testA: TestA,
    testB: TestB,
  });

  it("should generate create an instance from library", async () => {
    expect(library.create("testA").get()).toBe("TestA");
    expect(library.create("testB").get()).toBe("TestB");
  });

  it("should get all classes from library", async () => {
    const classes: { [name: string]: TestAbstract } = library.all();
    expect(classes["testA"].value).toBe("TestA");
    expect(classes["testB"].value).toBe("TestB");
  });
});
