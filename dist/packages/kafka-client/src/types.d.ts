export interface KafkaSendMessage {
    topic: string;
    key?: string;
    value: Buffer;
    headers?: Record<string, string>;
}
export interface KafkaClient {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    send(message: KafkaSendMessage): Promise<void>;
}
