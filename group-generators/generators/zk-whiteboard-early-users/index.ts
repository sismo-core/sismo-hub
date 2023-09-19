import { BigNumber } from "ethers";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const users: FetchedData = {
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x0ad0431242f100a3ff18e95a589410aa45859f8dfac8fba4622ba95c618000ce":
        "1",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x1e5751c9b7d7a9dc4c09ba0c3eb60d31c921d35b615e143303c2eeab148b3847":
        "2",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x051b6bbb713fe075a4c8d2e3a4f2a7ae403631ff66a59e372db4af079ad584a1":
        "3",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x12557f0d0486e6e19872355bccbea69fbbfcc082f54cb58a1fc734e2358c040d":
        "4",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x04d5aa8326fa4fdd1f7cdb6903881463bab65d42787bf535e9ad3b8d644a2d29":
        "5",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x27c4d4756c0f1d827eed71e6ee1526bbf4e88fe11d7f7a1e07335d6f12fa95e4":
        "6",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x07aff732f4876e13a9b19f453c6f492b5420132ecaf35ed4f08e8607855c243e":
        "7",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x1357292dc5f0a2f4853f6601f782d5b7ddee0afc3f48297e44fbacac7609d151":
        "8",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x06d96bd800472f936e695601a20829c7080c280357954405d3655d7e1fd8a39f":
        "9",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x19ced01af3c56df77dd9bd8078b6984a81337e99036af4488d91bdf633dcfbb8":
        "10",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x241aab69b86f4e7242ce85d868b02138d8a07a66f7a715cc7cdd249c11c295c2":
        "11",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x12e3256d77bfcbe14d880a6a543ffd7b6c2d6db11bd45c00b86ab1cb73e9822e":
        "12",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x271e0c05b65a0559af3839bdf228d08bbc6d05a28a244ccb378b808c5a7781f1":
        "13",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x224ee63510b370a6b56052a54f731da6f2c89caf8ddfffcd69a2bd50eb25eaac":
        "14",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x10fd8c9e17db65155eddedb075f6abeec13304d34d85a65a3fba634e46e901c8":
        "15",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x0148a2b3aaed49128ddfc430c9f7cb0dffdbd05dd523ca47db0dca8dcd51f402":
        "16",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x16961897a5ff1550da06e5484ce5f09a78d9bd39b692fe44186f7ea93173a2c1":
        "17",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x05dc104fa39ef7c61614f7b0afb7b2560fdfaef6600437ed5ebfd109b29227ac":
        "18",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x1a499a6402ca1369966cbf65fd1113b1acc257b0fd4d9ddaf10134dda6714e5a":
        "19",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x26d545f2485515277030395daca050503951123e5f22fbb4fa4fb415ccef872b":
        "20",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x0f897c04586a728bb7519e55250a040a6ea48f6417741e2230b034070d8eb546":
        "21",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x0f4aed911f9a120f11c4f2bc2c8e79f1d3cca1cbab0f6b17960d14d653455c10":
        "22",
      "sismo-connect-app(appid=0xf4cdb005c588dfce6eae2dd4907390c7):0x0522850fb3dced14e98054682b08665961f3bbedaca408be616ae830adcdb060":
        "23",
    };

    // inverse all the values: exemple: 1 -> 23, 2 -> 22, 3 -> 21, etc.
    const usersReordered: FetchedData = {};
    for (const [key, value] of Object.entries(users)) {
      usersReordered[key] = (24 - BigNumber.from(value).toNumber()).toString();
    }

    return [
      {
        name: "zk-whiteboard-early-users",
        timestamp: context.timestamp,
        description: "Data Group of all addresses early users of the zk-whiteboard app",
        specs: "Contains all the vaultId of the early users of the zk-whiteboard.xyz app",
        data: usersReordered,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
