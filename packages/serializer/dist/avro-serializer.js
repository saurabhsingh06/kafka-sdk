"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvroSerializer = void 0;
const avsc_1 = __importDefault(require("avsc"));
class AvroSerializer {
    constructor() {
        this.compiledSchemas = new Map();
    }
    compile(schema) {
        if (this.compiledSchemas.has(schema.id)) {
            return this.compiledSchemas.get(schema.id);
        }
        const type = avsc_1.default.Type.forSchema(JSON.parse(schema.definition));
        this.compiledSchemas.set(schema.id, type);
        return type;
    }
    serialize(payload, schema) {
        const type = this.compile(schema);
        // 👇 THIS IS WHERE VALIDATION HAPPENS
        const isValid = type.isValid(payload);
        if (!isValid) {
            throw new Error(`Payload does not match schema ${schema.subject}`);
        }
        const buffer = type.toBuffer(payload);
        return buffer;
    }
    deserialize(buffer, schema) {
        const type = this.compile(schema);
        return type.fromBuffer(buffer);
    }
}
exports.AvroSerializer = AvroSerializer;
