import { Kafka, KafkaConfig as KJSConfig } from "kafkajs";
import { KafkaConfig } from "../config/types";
import { KafkaProducer } from "../producer/producer";

export class KafkaClient {
  private kafka: Kafka;

  constructor(private config: KafkaConfig) {
    const kafkaConfig: KJSConfig = {
      clientId: config.clientId,
      brokers: config.brokers,
      retry: config.retry,
    };

    this.kafka = new Kafka(kafkaConfig);
  }

  getKafkaInstance(): Kafka {
    return this.kafka;
  }

  getProducer(): KafkaProducer {
    return new KafkaProducer(this.kafka);
  }
}


