export interface ProducerMessage<T = any> {
    key?: string;
    value: T;
  }
  
  export interface SendPayload<T = any> {
    topic: string;
    messages: ProducerMessage<T>[];
  }