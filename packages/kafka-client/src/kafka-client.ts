import { Kafka, Producer } from "kafkajs";
import {
  KafkaClient,
  KafkaSendMessage,
} from "./types";

export interface KafkaClientConfig {
  clientId: string;
  brokers: string[];
  groupId?: string;
}

export class KafkaJsClient implements KafkaClient {
  private kafka: Kafka;
  private producer: Producer;

  constructor(private config: KafkaClientConfig) {
    this.kafka = new Kafka({
      clientId: config.clientId,
      brokers: config.brokers,
    });

    this.producer = this.kafka.producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  async send(message: KafkaSendMessage): Promise<void> {
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