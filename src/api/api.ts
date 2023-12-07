import { execSync } from "child_process";
import * as fs from 'fs';
import path from "path";
import cors from "@fastify/cors";
import FastifyStatic from "@fastify/static";
import FastifySwagger from "@fastify/swagger";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import axios from "axios";
import Fastify, { FastifyInstance } from "fastify";
import { ApiConstructorArgs } from ".";
import { FileStore } from "file-store";
import { LoggerService } from "logger/logger";
import { AvailableDataStore } from "topics/available-data";
import availableDataRoutes from "topics/available-data/available-data.api";
import { BadgeService } from "topics/badge";
import badgesRoutes from "topics/badge/badge.api";
import { DataProviderService } from "topics/data-provider";
import dataProviderInterfacesRoutes from "topics/data-provider/data-provider.api";
import { FlowService } from "topics/flow";
import flowsRoutes from "topics/flow/flow.api";
import { GroupStore } from "topics/group";
import { GroupGeneratorService, GroupGeneratorStore } from "topics/group-generator";
import groupGeneratorsRoutes from "topics/group-generator/group-generator.api";
import { GroupSnapshotStore } from "topics/group-snapshot";
import groupSnapshotsRoutes from "topics/group-snapshot/group-snapshot.api";
import groupsRoutes from "topics/group/group.api";
import { RegistryTreeService } from "topics/registry-tree";
import { GlobalResolver } from "topics/resolver/global-resolver";
import resolverRoutes from "topics/resolver/resolver.api";

const removeTrailingSlash = (s: string) => s.replace(/\/+$/, "");

const DEFAULT_STATIC_PREFIX = "/static";

export class ApiService {
  attesterService: RegistryTreeService;
  badgeService: BadgeService;
  dataProviderInterfaceService: DataProviderService;
  flowService: FlowService;
  groupGeneratorService: GroupGeneratorService;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  globalResolver: GlobalResolver;
  groupStore: GroupStore;
  groupSnapshotStore: GroupSnapshotStore;
  groupGeneratorStore: GroupGeneratorStore;
  log: boolean;
  staticPrefix: string;
  logger: LoggerService;
  

  constructor(configuration: ApiConstructorArgs) {
    this.attesterService = configuration.attesterService;
    this.badgeService = configuration.badgeService;
    this.dataProviderInterfaceService = configuration.dataProviderInterfaceService;
    this.flowService = configuration.flowService;
    this.groupGeneratorService = configuration.groupGeneratorService;
    this.availableDataStore = configuration.availableDataStore;
    this.availableGroupStore = configuration.availableGroupStore;
    this.globalResolver = configuration.globalResolver;
    this.groupStore = configuration.groupStore;
    this.groupSnapshotStore = configuration.groupSnapshotStore;
    this.groupGeneratorStore = configuration.groupGeneratorStore;
    this.logger = configuration.logger;

    this.log = configuration.log !== undefined ? configuration.log : true;
    this.staticPrefix = configuration.staticPrefix ?? DEFAULT_STATIC_PREFIX;
  }

  public getApi() {
    const fastify = Fastify({
      logger: this.log,
      ignoreTrailingSlash: true,
    });
    fastify
      .withTypeProvider<JsonSchemaToTsProvider>()
      .register(cors, { origin: true })

      .decorate("attesters", this.attesterService)
      .decorate("badges", this.badgeService)
      .decorate("flows", this.flowService)
      .decorate("dataProviderInterfaces", this.dataProviderInterfaceService)
      .decorate("groupGenerators", this.groupGeneratorService)
      .decorate("groupGeneratorStore", this.groupGeneratorStore)

      .decorate("availableDataStore", this.availableDataStore)
      .decorate("availableGroupStore", this.availableGroupStore)
      .decorate("globalResolver", this.globalResolver)
      .decorate("groupStore", this.groupStore)
      .decorate("groupSnapshotStore", this.groupSnapshotStore)
      .decorate("logger", this.logger)

      .decorate("staticUrl", (path: string) => `${removeTrailingSlash(this.staticPrefix)}/${path}`)

      .register(FastifySwagger, {
        routePrefix: "/doc",
        openapi: {
          info: {
            title: "Sismo Data Sources API",
            description: "Sismo Data Sources API - Swagger",
            version: "0.1.0",
          },
        },
        exposeRoute: true,
      })

      .register(availableDataRoutes)
      .register(badgesRoutes)
      .register(flowsRoutes)
      .register(dataProviderInterfacesRoutes)
      .register(groupsRoutes)
      .register(groupSnapshotsRoutes)
      .register(groupGeneratorsRoutes)
      .register(resolverRoutes)

      .register(this.availableGroupStore.registerRoutes())
      .register(this.groupStore.dataFileStore.registerRoutes())
      .register(this.groupSnapshotStore.dataFileStore.registerRoutes());

    if (this.staticPrefix == DEFAULT_STATIC_PREFIX) {
      fastify.register(FastifyStatic, {
        root: path.join(__dirname, "../../static"),
        prefix: `${DEFAULT_STATIC_PREFIX}/`,
      });
    }

    this._addRapidDocRedirect(fastify);
    this._creategroup(fastify);
    return fastify;
  }

  /* istanbul ignore next */
  public async start(port: number) {
    await this.getApi().listen({ port });
  }

  public async getOpenApiSchema() {
    const api = this.getApi();
    await api.ready();
    return api.swagger();
  }
  

  private _addRapidDocRedirect(fastify: FastifyInstance) {
    fastify.get("/rapidoc", { schema: { hide: true } }, async (request, reply) => {
      reply.redirect(fastify.staticUrl("rapidoc/index.html"));
    });
  }
  
  private _creategroup(fastify:FastifyInstance){
    interface CreateGroupRequest {
      jsonListData0: any; // Adjust the type as needed
      name: string;
      description: string;
      specs: string;
    }
    fastify.post('/creategroup', async (request, reply) => {
      try {
        const body: CreateGroupRequest = request.body as CreateGroupRequest;
    
        // Now TypeScript recognizes the structure of 'body'
        const { jsonListData0, name, description, specs } = body;
        const targetFolderPath = path.resolve(__dirname, '../../group-generators/generators');
        const newFolderName = name ?? 'new-group'
        const newFolderPath = path.join(targetFolderPath, newFolderName);
        const indexPath = path.join(newFolderPath, 'index.ts');
        const codeString = `import {
          ValueType,
          Tags,
          GroupWithData,
        } from "topics/group";
        import {
          GenerationContext,
          GenerationFrequency,
          GroupGenerator,
        } from "topics/group-generator";
        
        const generator: GroupGenerator = {
          generationFrequency: GenerationFrequency.Once,
        
          generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
        
            const jsonListData0 = ${JSON.stringify(jsonListData0)}
        
            return [
              {
                // give a name to your Group
                name: "${name}",
                timestamp: context.timestamp,
                description: "${description}",
                // document the Group eligibility criterias more specifically
                specs: "${specs}", 
                data: jsonListData0,
                valueType: ValueType.Info,
                tags: [Tags.User, Tags.Lens, Tags.Web3Social],
              },
            ];
          },
        };
        
        export default generator;
        `
        try {
          if (!fs.existsSync(newFolderPath)) {
            fs.mkdirSync(newFolderPath);

            console.log(`Folder '${newFolderName}' created successfully at: ${newFolderPath}`);

            fs.writeFileSync(indexPath, codeString);

            console.log(`File 'index.ts' created successfully at: ${indexPath}`);
          } else {
            console.log(`Folder '${newFolderName}' already exists at: ${newFolderPath}`);
          }
        } catch (error) {
          console.error('Error creating folder or file:', error);
        }
        
        const addGeneratorImport = (generatorName: string) => {
          const indexPath = path.resolve(__dirname, "../../group-generators/generators/index.ts");
          const content = fs.readFileSync(indexPath, "utf-8");
          const importStatement = `import ${generatorName} from "./${generatorName}";`;

          if (!content.includes(importStatement)) {
            const updatedContent = content.replace(/(import .* from "\.\/.*";)/, `$1\n${importStatement}`);
            fs.writeFileSync(indexPath, updatedContent, "utf-8");
          }
        };
        const updateGroupGenerators = (generatorName: string) => {
          const indexPath = path.resolve(__dirname, "../../group-generators/generators/index.ts");
          const content = fs.readFileSync(indexPath, "utf-8");
          const groupGeneratorsEntry = `"${generatorName}": ${generatorName},
          //replace this`;
        
          if (!content.includes(groupGeneratorsEntry)) {
            const updatedContent = content.replace(
               `//replace this`,
              `${groupGeneratorsEntry}`
            );
            fs.writeFileSync(indexPath, updatedContent, "utf-8");
          }
        };
        const runYarnCommand = (command: string) => {
          try {
            execSync(command, { stdio: "inherit" });
          } catch (error) {
            console.error(`Error running command: ${command}`);
            process.exit(1);
          }
        };
        const getGroupDataUrl = async (name: string) => {
          const apiUrl = `http://localhost:8000/groups/${name}`;
          try {
            const response = await axios.get(apiUrl);
        
            if (response.data && response.data.items && response.data.items.length > 0) {
              const group = response.data.items[0];
        
              if (group.dataUrl) {
                return group.dataUrl;
              } else {
                throw new Error('Data URL not found in the response');
              }
            } else {
              throw new Error('Invalid response structure');
            }
          } catch (error) {
            console.error(`Error fetching data URL: ${(error as Error).message}`);
            throw new Error('Internal Server Error');
          }
        };
        addGeneratorImport(name);
        updateGroupGenerators(name);
        runYarnCommand(`yarn generate-group ${name}`);
        const url=await getGroupDataUrl(name);
        const host = request.hostname;
        reply.code(201).send({ message: 'Data group created successfully',url:host+url });
      } catch (error) {
        console.error('Error creating data group:', error);
        reply.code(500).send({ error: 'Internal Server Error' });
      }
    });
  }
}
