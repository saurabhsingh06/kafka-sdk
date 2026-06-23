import { SchemaRegistryClient } from "@saurabh_singh_06/schema-registry";
import { Serializer } from "@saurabh_singh_06/serializer";
import { KafkaClientWrapper } from "@saurabh_singh_06/kafka-client";
export declare class KafkaProducer {
    private readonly schemaRegistry;
    private readonly serializer;
    private readonly client;
    constructor(schemaRegistry: SchemaRegistryClient, serializer: Serializer, client: KafkaClientWrapper);
    publish<T>(topic: string, payload: T): Promise<void>;
}
