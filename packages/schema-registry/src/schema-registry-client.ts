import { Schema } from "@saurabh_singh_06/kafka-core";

export interface SchemaRegistryClient {
    getLatestSchema(subject: string): Promise<Schema>;
    getSchemaById(id: number): Promise<Schema>;
    registerSchema(subject: string, schema: string): Promise<number>;
  }