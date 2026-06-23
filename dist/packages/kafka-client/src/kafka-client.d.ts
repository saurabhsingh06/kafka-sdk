import { KafkaClient, KafkaSendMessage } from "./types";
export interface KafkaClientConfig {
    clientId: string;
    brokers: string[];
    groupId?: string;
}
export declare class KafkaClientWrapper implements KafkaClient {
    private config;
    private kafka;
    private producer;
    constructor(config: KafkaClientConfig);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    send(message: KafkaSendMessage): Promise<void>;
}
