import { SchemaRegistryClient } from "@saurabh_singh_06/schema-registry";
import { Serializer } from "@saurabh_singh_06/serializer";
import { KafkaClientWrapper } from "@saurabh_singh_06/kafka-client";

export class KafkaProducer {
  constructor(
    private readonly schemaRegistry: SchemaRegistryClient,
    private readonly serializer: Serializer,
    private readonly client: KafkaClientWrapper
  ) {}

  async publish<T>(
    topic: string,
    payload: T
  ): Promise<void> {
    
    // 1. derive schema subject
    const subject = `${topic}-value`;

    // 2. fetch schema (cached inside registry layer)
    const schema = await this.schemaRegistry.getLatestSchema(subject);

    // 3. serialize + validate
    const buffer = this.serializer.serialize(payload, schema);

    // 4. send to kafka
    await this.client.send({
      topic,
      value: buffer,
    });
  }
}