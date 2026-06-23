import { Schema } from "@saurabh_singh_06/kafka-core";
import { Serializer } from "./types";
export declare class AvroSerializer implements Serializer {
    private compiledSchemas;
    private compile;
    serialize(payload: unknown, schema: Schema): Buffer;
    deserialize(buffer: Buffer, schema: Schema): unknown;
}
