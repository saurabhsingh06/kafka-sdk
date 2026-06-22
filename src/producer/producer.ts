import { Kafka } from "kafkajs";
import { SendPayload } from "./types";

export class KafkaProducer {
  private producer;

  constructor(private kafka: Kafka) {
    this.producer = kafka.producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  async send<T>(payload: SendPayload<T>): Promise<void> {
    const { topic, messages } = payload;

    await this.producer.send({
      topic,
      messages: messages.map((msg) => ({
        key: msg.key,
        value: JSON.stringify(msg.value), // v1: simple JSON serialization
      })),
    });
  }
}
