import { Schema } from "@saurabh_singh_06/kafka-core";

export interface Serializer {
  serialize(payload: unknown, schema: Schema): Buffer;

  deserialize(buffer: Buffer, schema: Schema): unknown;
}