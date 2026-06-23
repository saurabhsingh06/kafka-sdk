"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducer = void 0;
class KafkaProducer {
    constructor(schemaRegistry, serializer, client) {
        this.schemaRegistry = schemaRegistry;
        this.serializer = serializer;
        this.client = client;
    }
    async publish(topic, payload) {
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
exports.KafkaProducer = KafkaProducer;
