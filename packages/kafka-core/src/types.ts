export interface Schema {
    id: number;
    subject: string;
    version: number;
    definition: string; // Avro/JSON schema string
  }