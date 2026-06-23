import { SchemaRegistryClient } from "./schema-registry-client";
import { Schema } from "@saurabh_singh_06/kafka-core";
export interface ConfluentConfig {
    baseUrl: string;
    authToken?: string;
}
export declare class ConfluentSchemaRegistryClient implements SchemaRegistryClient {
    private config;
    constructor(config: ConfluentConfig);
    getLatestSchema(subject: string): Promise<Schema>;
    getSchemaById(id: number): Promise<Schema>;
    registerSchema(subject: string, schema: string): Promise<number>;
}
