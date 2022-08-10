/* eslint-disable */
import { Timestamp } from "../google/protobuf/timestamp";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kannon";

export interface EmailToSend {
  messageId: string;
  from: string;
  to: string;
  returnPath: string;
  body: Uint8Array;
}

export interface Delivered {
  messageId: string;
  email: string;
  timestamp: Date | undefined;
}

export interface Error {
  messageId: string;
  email: string;
  code: number;
  msg: string;
  isPermanent: boolean;
  timestamp: Date | undefined;
}

export interface Open {
  messageId: string;
  email: string;
  ip: string;
  userAgent: string;
  timestamp: Date | undefined;
}

export interface Click {
  messageId: string;
  email: string;
  ip: string;
  userAgent: string;
  url: string;
  timestamp: Date | undefined;
}

export interface SoftBounce {
  messageId: string;
  email: string;
  from: string;
  code: number;
  msg: string;
  timestamp: Date | undefined;
  domain: string;
}

function createBaseEmailToSend(): EmailToSend {
  return {
    messageId: "",
    from: "",
    to: "",
    returnPath: "",
    body: new Uint8Array(),
  };
}

export const EmailToSend = {
  encode(
    message: EmailToSend,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    if (message.from !== "") {
      writer.uint32(18).string(message.from);
    }
    if (message.to !== "") {
      writer.uint32(26).string(message.to);
    }
    if (message.returnPath !== "") {
      writer.uint32(34).string(message.returnPath);
    }
    if (message.body.length !== 0) {
      writer.uint32(42).bytes(message.body);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmailToSend {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmailToSend();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.string();
          break;
        case 2:
          message.from = reader.string();
          break;
        case 3:
          message.to = reader.string();
          break;
        case 4:
          message.returnPath = reader.string();
          break;
        case 5:
          message.body = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EmailToSend {
    return {
      messageId: isSet(object.messageId) ? String(object.messageId) : "",
      from: isSet(object.from) ? String(object.from) : "",
      to: isSet(object.to) ? String(object.to) : "",
      returnPath: isSet(object.returnPath) ? String(object.returnPath) : "",
      body: isSet(object.body)
        ? bytesFromBase64(object.body)
        : new Uint8Array(),
    };
  },

  toJSON(message: EmailToSend): unknown {
    const obj: any = {};
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.from !== undefined && (obj.from = message.from);
    message.to !== undefined && (obj.to = message.to);
    message.returnPath !== undefined && (obj.returnPath = message.returnPath);
    message.body !== undefined &&
      (obj.body = base64FromBytes(
        message.body !== undefined ? message.body : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EmailToSend>, I>>(
    object: I
  ): EmailToSend {
    const message = createBaseEmailToSend();
    message.messageId = object.messageId ?? "";
    message.from = object.from ?? "";
    message.to = object.to ?? "";
    message.returnPath = object.returnPath ?? "";
    message.body = object.body ?? new Uint8Array();
    return message;
  },
};

function createBaseDelivered(): Delivered {
  return { messageId: "", email: "", timestamp: undefined };
}

export const Delivered = {
  encode(
    message: Delivered,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Delivered {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelivered();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.string();
          break;
        case 2:
          message.email = reader.string();
          break;
        case 3:
          message.timestamp = fromTimestamp(
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

  fromJSON(object: any): Delivered {
    return {
      messageId: isSet(object.messageId) ? String(object.messageId) : "",
      email: isSet(object.email) ? String(object.email) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
    };
  },

  toJSON(message: Delivered): unknown {
    const obj: any = {};
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.email !== undefined && (obj.email = message.email);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Delivered>, I>>(
    object: I
  ): Delivered {
    const message = createBaseDelivered();
    message.messageId = object.messageId ?? "";
    message.email = object.email ?? "";
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseError(): Error {
  return {
    messageId: "",
    email: "",
    code: 0,
    msg: "",
    isPermanent: false,
    timestamp: undefined,
  };
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.code !== 0) {
      writer.uint32(24).uint32(message.code);
    }
    if (message.msg !== "") {
      writer.uint32(34).string(message.msg);
    }
    if (message.isPermanent === true) {
      writer.uint32(40).bool(message.isPermanent);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.string();
          break;
        case 2:
          message.email = reader.string();
          break;
        case 3:
          message.code = reader.uint32();
          break;
        case 4:
          message.msg = reader.string();
          break;
        case 5:
          message.isPermanent = reader.bool();
          break;
        case 6:
          message.timestamp = fromTimestamp(
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

  fromJSON(object: any): Error {
    return {
      messageId: isSet(object.messageId) ? String(object.messageId) : "",
      email: isSet(object.email) ? String(object.email) : "",
      code: isSet(object.code) ? Number(object.code) : 0,
      msg: isSet(object.msg) ? String(object.msg) : "",
      isPermanent: isSet(object.isPermanent)
        ? Boolean(object.isPermanent)
        : false,
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
    };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.email !== undefined && (obj.email = message.email);
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.msg !== undefined && (obj.msg = message.msg);
    message.isPermanent !== undefined &&
      (obj.isPermanent = message.isPermanent);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.messageId = object.messageId ?? "";
    message.email = object.email ?? "";
    message.code = object.code ?? 0;
    message.msg = object.msg ?? "";
    message.isPermanent = object.isPermanent ?? false;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseOpen(): Open {
  return {
    messageId: "",
    email: "",
    ip: "",
    userAgent: "",
    timestamp: undefined,
  };
}

export const Open = {
  encode(message: Open, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.ip !== "") {
      writer.uint32(26).string(message.ip);
    }
    if (message.userAgent !== "") {
      writer.uint32(34).string(message.userAgent);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Open {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpen();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.string();
          break;
        case 2:
          message.email = reader.string();
          break;
        case 3:
          message.ip = reader.string();
          break;
        case 4:
          message.userAgent = reader.string();
          break;
        case 5:
          message.timestamp = fromTimestamp(
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

  fromJSON(object: any): Open {
    return {
      messageId: isSet(object.messageId) ? String(object.messageId) : "",
      email: isSet(object.email) ? String(object.email) : "",
      ip: isSet(object.ip) ? String(object.ip) : "",
      userAgent: isSet(object.userAgent) ? String(object.userAgent) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
    };
  },

  toJSON(message: Open): unknown {
    const obj: any = {};
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.email !== undefined && (obj.email = message.email);
    message.ip !== undefined && (obj.ip = message.ip);
    message.userAgent !== undefined && (obj.userAgent = message.userAgent);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Open>, I>>(object: I): Open {
    const message = createBaseOpen();
    message.messageId = object.messageId ?? "";
    message.email = object.email ?? "";
    message.ip = object.ip ?? "";
    message.userAgent = object.userAgent ?? "";
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseClick(): Click {
  return {
    messageId: "",
    email: "",
    ip: "",
    userAgent: "",
    url: "",
    timestamp: undefined,
  };
}

export const Click = {
  encode(message: Click, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.ip !== "") {
      writer.uint32(26).string(message.ip);
    }
    if (message.userAgent !== "") {
      writer.uint32(34).string(message.userAgent);
    }
    if (message.url !== "") {
      writer.uint32(42).string(message.url);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Click {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClick();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.string();
          break;
        case 2:
          message.email = reader.string();
          break;
        case 3:
          message.ip = reader.string();
          break;
        case 4:
          message.userAgent = reader.string();
          break;
        case 5:
          message.url = reader.string();
          break;
        case 6:
          message.timestamp = fromTimestamp(
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

  fromJSON(object: any): Click {
    return {
      messageId: isSet(object.messageId) ? String(object.messageId) : "",
      email: isSet(object.email) ? String(object.email) : "",
      ip: isSet(object.ip) ? String(object.ip) : "",
      userAgent: isSet(object.userAgent) ? String(object.userAgent) : "",
      url: isSet(object.url) ? String(object.url) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
    };
  },

  toJSON(message: Click): unknown {
    const obj: any = {};
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.email !== undefined && (obj.email = message.email);
    message.ip !== undefined && (obj.ip = message.ip);
    message.userAgent !== undefined && (obj.userAgent = message.userAgent);
    message.url !== undefined && (obj.url = message.url);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Click>, I>>(object: I): Click {
    const message = createBaseClick();
    message.messageId = object.messageId ?? "";
    message.email = object.email ?? "";
    message.ip = object.ip ?? "";
    message.userAgent = object.userAgent ?? "";
    message.url = object.url ?? "";
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseSoftBounce(): SoftBounce {
  return {
    messageId: "",
    email: "",
    from: "",
    code: 0,
    msg: "",
    timestamp: undefined,
    domain: "",
  };
}

export const SoftBounce = {
  encode(
    message: SoftBounce,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.from !== "") {
      writer.uint32(26).string(message.from);
    }
    if (message.code !== 0) {
      writer.uint32(32).uint32(message.code);
    }
    if (message.msg !== "") {
      writer.uint32(42).string(message.msg);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.domain !== "") {
      writer.uint32(58).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SoftBounce {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSoftBounce();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.string();
          break;
        case 2:
          message.email = reader.string();
          break;
        case 3:
          message.from = reader.string();
          break;
        case 4:
          message.code = reader.uint32();
          break;
        case 5:
          message.msg = reader.string();
          break;
        case 6:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.domain = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SoftBounce {
    return {
      messageId: isSet(object.messageId) ? String(object.messageId) : "",
      email: isSet(object.email) ? String(object.email) : "",
      from: isSet(object.from) ? String(object.from) : "",
      code: isSet(object.code) ? Number(object.code) : 0,
      msg: isSet(object.msg) ? String(object.msg) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: SoftBounce): unknown {
    const obj: any = {};
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.email !== undefined && (obj.email = message.email);
    message.from !== undefined && (obj.from = message.from);
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.msg !== undefined && (obj.msg = message.msg);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.domain !== undefined && (obj.domain = message.domain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SoftBounce>, I>>(
    object: I
  ): SoftBounce {
    const message = createBaseSoftBounce();
    message.messageId = object.messageId ?? "";
    message.email = object.email ?? "";
    message.from = object.from ?? "";
    message.code = object.code ?? 0;
    message.msg = object.msg ?? "";
    message.timestamp = object.timestamp ?? undefined;
    message.domain = object.domain ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(String.fromCharCode(byte));
  });
  return btoa(bin.join(""));
}

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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
