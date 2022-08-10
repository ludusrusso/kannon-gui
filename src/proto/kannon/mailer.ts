/* eslint-disable */
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import { Timestamp } from "../google/protobuf/timestamp";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kannon";

export interface SendHTMLReq {
  sender: Sender | undefined;
  subject: string;
  html: string;
  scheduledTime?: Date | undefined;
  recipients: Recipient[];
}

export interface SendTemplateReq {
  sender: Sender | undefined;
  subject: string;
  templateId: string;
  scheduledTime?: Date | undefined;
  recipients: Recipient[];
}

export interface SendRes {
  messageId: string;
  templateId: string;
  scheduledTime: Date | undefined;
}

export interface Sender {
  email: string;
  alias: string;
}

export interface Recipient {
  email: string;
  fields: { [key: string]: string };
}

export interface Recipient_FieldsEntry {
  key: string;
  value: string;
}

function createBaseSendHTMLReq(): SendHTMLReq {
  return {
    sender: undefined,
    subject: "",
    html: "",
    scheduledTime: undefined,
    recipients: [],
  };
}

export const SendHTMLReq = {
  encode(
    message: SendHTMLReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== undefined) {
      Sender.encode(message.sender, writer.uint32(10).fork()).ldelim();
    }
    if (message.subject !== "") {
      writer.uint32(26).string(message.subject);
    }
    if (message.html !== "") {
      writer.uint32(34).string(message.html);
    }
    if (message.scheduledTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.scheduledTime),
        writer.uint32(42).fork()
      ).ldelim();
    }
    for (const v of message.recipients) {
      Recipient.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendHTMLReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendHTMLReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = Sender.decode(reader, reader.uint32());
          break;
        case 3:
          message.subject = reader.string();
          break;
        case 4:
          message.html = reader.string();
          break;
        case 5:
          message.scheduledTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.recipients.push(Recipient.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendHTMLReq {
    return {
      sender: isSet(object.sender) ? Sender.fromJSON(object.sender) : undefined,
      subject: isSet(object.subject) ? String(object.subject) : "",
      html: isSet(object.html) ? String(object.html) : "",
      scheduledTime: isSet(object.scheduledTime)
        ? fromJsonTimestamp(object.scheduledTime)
        : undefined,
      recipients: Array.isArray(object?.recipients)
        ? object.recipients.map((e: any) => Recipient.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SendHTMLReq): unknown {
    const obj: any = {};
    message.sender !== undefined &&
      (obj.sender = message.sender ? Sender.toJSON(message.sender) : undefined);
    message.subject !== undefined && (obj.subject = message.subject);
    message.html !== undefined && (obj.html = message.html);
    message.scheduledTime !== undefined &&
      (obj.scheduledTime = message.scheduledTime.toISOString());
    if (message.recipients) {
      obj.recipients = message.recipients.map((e) =>
        e ? Recipient.toJSON(e) : undefined
      );
    } else {
      obj.recipients = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendHTMLReq>, I>>(
    object: I
  ): SendHTMLReq {
    const message = createBaseSendHTMLReq();
    message.sender =
      object.sender !== undefined && object.sender !== null
        ? Sender.fromPartial(object.sender)
        : undefined;
    message.subject = object.subject ?? "";
    message.html = object.html ?? "";
    message.scheduledTime = object.scheduledTime ?? undefined;
    message.recipients =
      object.recipients?.map((e) => Recipient.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSendTemplateReq(): SendTemplateReq {
  return {
    sender: undefined,
    subject: "",
    templateId: "",
    scheduledTime: undefined,
    recipients: [],
  };
}

export const SendTemplateReq = {
  encode(
    message: SendTemplateReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sender !== undefined) {
      Sender.encode(message.sender, writer.uint32(10).fork()).ldelim();
    }
    if (message.subject !== "") {
      writer.uint32(26).string(message.subject);
    }
    if (message.templateId !== "") {
      writer.uint32(34).string(message.templateId);
    }
    if (message.scheduledTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.scheduledTime),
        writer.uint32(42).fork()
      ).ldelim();
    }
    for (const v of message.recipients) {
      Recipient.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendTemplateReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendTemplateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = Sender.decode(reader, reader.uint32());
          break;
        case 3:
          message.subject = reader.string();
          break;
        case 4:
          message.templateId = reader.string();
          break;
        case 5:
          message.scheduledTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.recipients.push(Recipient.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendTemplateReq {
    return {
      sender: isSet(object.sender) ? Sender.fromJSON(object.sender) : undefined,
      subject: isSet(object.subject) ? String(object.subject) : "",
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
      scheduledTime: isSet(object.scheduledTime)
        ? fromJsonTimestamp(object.scheduledTime)
        : undefined,
      recipients: Array.isArray(object?.recipients)
        ? object.recipients.map((e: any) => Recipient.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SendTemplateReq): unknown {
    const obj: any = {};
    message.sender !== undefined &&
      (obj.sender = message.sender ? Sender.toJSON(message.sender) : undefined);
    message.subject !== undefined && (obj.subject = message.subject);
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.scheduledTime !== undefined &&
      (obj.scheduledTime = message.scheduledTime.toISOString());
    if (message.recipients) {
      obj.recipients = message.recipients.map((e) =>
        e ? Recipient.toJSON(e) : undefined
      );
    } else {
      obj.recipients = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendTemplateReq>, I>>(
    object: I
  ): SendTemplateReq {
    const message = createBaseSendTemplateReq();
    message.sender =
      object.sender !== undefined && object.sender !== null
        ? Sender.fromPartial(object.sender)
        : undefined;
    message.subject = object.subject ?? "";
    message.templateId = object.templateId ?? "";
    message.scheduledTime = object.scheduledTime ?? undefined;
    message.recipients =
      object.recipients?.map((e) => Recipient.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSendRes(): SendRes {
  return { messageId: "", templateId: "", scheduledTime: undefined };
}

export const SendRes = {
  encode(
    message: SendRes,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    if (message.templateId !== "") {
      writer.uint32(18).string(message.templateId);
    }
    if (message.scheduledTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.scheduledTime),
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.string();
          break;
        case 2:
          message.templateId = reader.string();
          break;
        case 3:
          message.scheduledTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendRes {
    return {
      messageId: isSet(object.messageId) ? String(object.messageId) : "",
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
      scheduledTime: isSet(object.scheduledTime)
        ? fromJsonTimestamp(object.scheduledTime)
        : undefined,
    };
  },

  toJSON(message: SendRes): unknown {
    const obj: any = {};
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.scheduledTime !== undefined &&
      (obj.scheduledTime = message.scheduledTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendRes>, I>>(object: I): SendRes {
    const message = createBaseSendRes();
    message.messageId = object.messageId ?? "";
    message.templateId = object.templateId ?? "";
    message.scheduledTime = object.scheduledTime ?? undefined;
    return message;
  },
};

function createBaseSender(): Sender {
  return { email: "", alias: "" };
}

export const Sender = {
  encode(
    message: Sender,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.alias !== "") {
      writer.uint32(18).string(message.alias);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sender {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSender();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.alias = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Sender {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      alias: isSet(object.alias) ? String(object.alias) : "",
    };
  },

  toJSON(message: Sender): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.alias !== undefined && (obj.alias = message.alias);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Sender>, I>>(object: I): Sender {
    const message = createBaseSender();
    message.email = object.email ?? "";
    message.alias = object.alias ?? "";
    return message;
  },
};

function createBaseRecipient(): Recipient {
  return { email: "", fields: {} };
}

export const Recipient = {
  encode(
    message: Recipient,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    Object.entries(message.fields).forEach(([key, value]) => {
      Recipient_FieldsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Recipient {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecipient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          const entry2 = Recipient_FieldsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.fields[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Recipient {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      fields: isObject(object.fields)
        ? Object.entries(object.fields).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {}
          )
        : {},
    };
  },

  toJSON(message: Recipient): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    obj.fields = {};
    if (message.fields) {
      Object.entries(message.fields).forEach(([k, v]) => {
        obj.fields[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Recipient>, I>>(
    object: I
  ): Recipient {
    const message = createBaseRecipient();
    message.email = object.email ?? "";
    message.fields = Object.entries(object.fields ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseRecipient_FieldsEntry(): Recipient_FieldsEntry {
  return { key: "", value: "" };
}

export const Recipient_FieldsEntry = {
  encode(
    message: Recipient_FieldsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): Recipient_FieldsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecipient_FieldsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Recipient_FieldsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: Recipient_FieldsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Recipient_FieldsEntry>, I>>(
    object: I
  ): Recipient_FieldsEntry {
    const message = createBaseRecipient_FieldsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

export type MailerService = typeof MailerService;
export const MailerService = {
  sendHTML: {
    path: "/kannon.Mailer/SendHTML",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SendHTMLReq) =>
      Buffer.from(SendHTMLReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SendHTMLReq.decode(value),
    responseSerialize: (value: SendRes) =>
      Buffer.from(SendRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SendRes.decode(value),
  },
  sendTemplate: {
    path: "/kannon.Mailer/SendTemplate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SendTemplateReq) =>
      Buffer.from(SendTemplateReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SendTemplateReq.decode(value),
    responseSerialize: (value: SendRes) =>
      Buffer.from(SendRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SendRes.decode(value),
  },
} as const;

export interface MailerServer extends UntypedServiceImplementation {
  sendHTML: handleUnaryCall<SendHTMLReq, SendRes>;
  sendTemplate: handleUnaryCall<SendTemplateReq, SendRes>;
}

export interface MailerClient extends Client {
  sendHTML(
    request: SendHTMLReq,
    callback: (error: ServiceError | null, response: SendRes) => void
  ): ClientUnaryCall;
  sendHTML(
    request: SendHTMLReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SendRes) => void
  ): ClientUnaryCall;
  sendHTML(
    request: SendHTMLReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SendRes) => void
  ): ClientUnaryCall;
  sendTemplate(
    request: SendTemplateReq,
    callback: (error: ServiceError | null, response: SendRes) => void
  ): ClientUnaryCall;
  sendTemplate(
    request: SendTemplateReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SendRes) => void
  ): ClientUnaryCall;
  sendTemplate(
    request: SendTemplateReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SendRes) => void
  ): ClientUnaryCall;
}

export const MailerClient = makeGenericClientConstructor(
  MailerService,
  "kannon.Mailer"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): MailerClient;
  service: typeof MailerService;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
