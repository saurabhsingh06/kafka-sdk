"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaClientWrapper = void 0;
const kafkajs_1 = require("kafkajs");
class KafkaClientWrapper {
    constructor(config) {
        this.config = config;
        this.kafka = new kafkajs_1.Kafka({
            clientId: config.clientId,
            brokers: config.brokers,
        });
        this.producer = this.kafka.producer();
    }
    async connect() {
        await this.producer.connect();
    }
    async disconnect() {
        await this.producer.disconnect();
    }
    async send(message) {
        await this.producer.send({
            topic: message.topic,
            messages: [
                {
                    key: message.key,
                    value: message.value,
                    headers: message.headers,
                },
            ],
        });
    }
}
exports.KafkaClientWrapper = KafkaClientWrapper;
