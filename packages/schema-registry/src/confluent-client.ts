import axios from "axios";
import {
  SchemaRegistryClient,
} from "./schema-registry-client";
import { Schema } from "@saurabh_singh_06/kafka-core";

export interface ConfluentConfig {
  baseUrl: string;
  authToken?: string;
}

export class ConfluentSchemaRegistryClient
  implements SchemaRegistryClient
{
  constructor(private config: ConfluentConfig) {}

  async getLatestSchema(subject: string): Promise<Schema> {
    const res = await axios.get(
      `${this.config.baseUrl}/subjects/${subject}/versions/latest`
    );

    return {
      id: res.data.id,
      subject,
      version: res.data.version,
      definition: JSON.stringify(res.data.schema),
    };
  }

  async getSchemaById(id: number): Promise<Schema> {
    const res = await axios.get(
      `${this.config.baseUrl}/schemas/ids/${id}`
    );

    return {
      id,
      subject: res.data.subject || "unknown",
      version: res.data.version || 0,
      definition: JSON.stringify(res.data.schema),
    };
  }

  async registerSchema(subject: string, schema: string): Promise<number> {
    const res = await axios.post(
      `${this.config.baseUrl}/subjects/${subject}/versions`,
      {
        schema,
      }
    );

    return res.data.id;
  }
}