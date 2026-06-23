"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluentSchemaRegistryClient = void 0;
const axios_1 = __importDefault(require("axios"));
class ConfluentSchemaRegistryClient {
    constructor(config) {
        this.config = config;
    }
    async getLatestSchema(subject) {
        const res = await axios_1.default.get(`${this.config.baseUrl}/subjects/${subject}/versions/latest`);
        return {
            id: res.data.id,
            subject,
            version: res.data.version,
            definition: JSON.stringify(res.data.schema),
        };
    }
    async getSchemaById(id) {
        const res = await axios_1.default.get(`${this.config.baseUrl}/schemas/ids/${id}`);
        return {
            id,
            subject: res.data.subject || "unknown",
            version: res.data.version || 0,
            definition: JSON.stringify(res.data.schema),
        };
    }
    async registerSchema(subject, schema) {
        const res = await axios_1.default.post(`${this.config.baseUrl}/subjects/${subject}/versions`, {
            schema,
        });
        return res.data.id;
    }
}
exports.ConfluentSchemaRegistryClient = ConfluentSchemaRegistryClient;
