export interface KafkaConfig {
    clientId: string;
    brokers: string[];
  
    // optional but important for scaling
    groupId?: string;
  
    // retry control (basic first version)
    retry?: {
      maxRetryTime?: number;
      retries?: number;
    };
  }