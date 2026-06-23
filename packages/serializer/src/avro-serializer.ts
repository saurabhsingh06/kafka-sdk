import avro from "avsc";
import { Schema } from "@saurabh_singh_06/kafka-core";
import { Serializer } from "./types";

export class AvroSerializer implements Serializer {

  private compiledSchemas = new Map<number, avro.Type>();

  private compile(schema: Schema): avro.Type {
    if (this.compiledSchemas.has(schema.id)) {
      return this.compiledSchemas.get(schema.id)!;
    }

    const type = avro.Type.forSchema(
      JSON.parse(schema.definition)
    );

    this.compiledSchemas.set(schema.id, type);

    return type;
  }

  serialize(payload: unknown, schema: Schema): Buffer {
    const type = this.compile(schema);

    // 👇 THIS IS WHERE VALIDATION HAPPENS
    const isValid = type.isValid(payload);

    if (!isValid) {
      throw new Error(
        `Payload does not match schema ${schema.subject}`
      );
    }

    const buffer = type.toBuffer(payload);

    return buffer;
  }

  deserialize(buffer: Buffer, schema: Schema): unknown {
    const type = this.compile(schema);

    return type.fromBuffer(buffer);
  }
}