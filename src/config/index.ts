import { KafkaConfig } from "./types";

export function defineConfig(config: KafkaConfig): KafkaConfig {
  if (!config.clientId) {
    throw new Error("KafkaConfig: clientId is required");
  }

  if (!config.brokers || config.brokers.length === 0) {
    throw new Error("KafkaConfig: at least one broker is required");
  }

  return {
    retry: {
      maxRetryTime: 30000,
      retries: 5,
      ...config.retry,
    },
    ...config,
  };
}