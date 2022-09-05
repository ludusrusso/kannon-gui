/* eslint-disable */
import { Timestamp } from "../../../google/protobuf/timestamp";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "pkg.kannon.stats.types";

export interface Stats {
  messageId: string;
  domain: string;
  email: string;
  timestamp: Date | undefined;
  type: string;
  data: StatsData | undefined;
}

export interface StatsData {
  accepted: StatsDataAccepted | undefined;
  delivered: StatsDataDelivered | undefined;
  failed: StatsDataFailed | undefined;
  bounced: StatsDataBounced | undefined;
  opened: StatsDataOpened | undefined;
  clicked: StatsDataClicked | undefined;
  rejected: StatsDataRejected | undefined;
  error: StatsDataError | undefined;
}

export interface StatsDataAccepted {}

export interface StatsDataRejected {
  reason: string;
}

export interface StatsDataDelivered {}

export interface StatsDataFailed {}

export interface StatsDataBounced {
  permanent: boolean;
  code: number;
  msg: string;
}

export interface StatsDataError {
  code: number;
  msg: string;
}

export interface StatsDataOpened {
  userAgent: string;
  ip: string;
}

export interface StatsDataClicked {
  userAgent: string;
  ip: string;
  url: string;
}

function createBaseStats(): Stats {
  return {
    messageId: "",
    domain: "",
    email: "",
    timestamp: undefined,
    type: "",
    data: undefined,
  };
}

export const Stats = {
  encode(message: Stats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageId !== "") {
      writer.uint32(10).string(message.messageId);
    }
    if (message.domain !== "") {
      writer.uint32(18).string(message.domain);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(42).string(message.type);
    }
    if (message.data !== undefined) {
      StatsData.encode(message.data, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Stats {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.string();
          break;
        case 2:
          message.domain = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.timestamp = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.type = reader.string();
          break;
        case 6:
          message.data = StatsData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Stats {
    return {
      messageId: isSet(object.messageId) ? String(object.messageId) : "",
      domain: isSet(object.domain) ? String(object.domain) : "",
      email: isSet(object.email) ? String(object.email) : "",
      timestamp: isSet(object.timestamp)
        ? fromJsonTimestamp(object.timestamp)
        : undefined,
      type: isSet(object.type) ? String(object.type) : "",
      data: isSet(object.data) ? StatsData.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: Stats): unknown {
    const obj: any = {};
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.domain !== undefined && (obj.domain = message.domain);
    message.email !== undefined && (obj.email = message.email);
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    message.type !== undefined && (obj.type = message.type);
    message.data !== undefined &&
      (obj.data = message.data ? StatsData.toJSON(message.data) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Stats>, I>>(object: I): Stats {
    const message = createBaseStats();
    message.messageId = object.messageId ?? "";
    message.domain = object.domain ?? "";
    message.email = object.email ?? "";
    message.timestamp = object.timestamp ?? undefined;
    message.type = object.type ?? "";
    message.data =
      object.data !== undefined && object.data !== null
        ? StatsData.fromPartial(object.data)
        : undefined;
    return message;
  },
};

function createBaseStatsData(): StatsData {
  return {
    accepted: undefined,
    delivered: undefined,
    failed: undefined,
    bounced: undefined,
    opened: undefined,
    clicked: undefined,
    rejected: undefined,
    error: undefined,
  };
}

export const StatsData = {
  encode(
    message: StatsData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.accepted !== undefined) {
      StatsDataAccepted.encode(
        message.accepted,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.delivered !== undefined) {
      StatsDataDelivered.encode(
        message.delivered,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.failed !== undefined) {
      StatsDataFailed.encode(message.failed, writer.uint32(26).fork()).ldelim();
    }
    if (message.bounced !== undefined) {
      StatsDataBounced.encode(
        message.bounced,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.opened !== undefined) {
      StatsDataOpened.encode(message.opened, writer.uint32(42).fork()).ldelim();
    }
    if (message.clicked !== undefined) {
      StatsDataClicked.encode(
        message.clicked,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.rejected !== undefined) {
      StatsDataRejected.encode(
        message.rejected,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.error !== undefined) {
      StatsDataError.encode(message.error, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatsData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatsData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accepted = StatsDataAccepted.decode(reader, reader.uint32());
          break;
        case 2:
          message.delivered = StatsDataDelivered.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.failed = StatsDataFailed.decode(reader, reader.uint32());
          break;
        case 4:
          message.bounced = StatsDataBounced.decode(reader, reader.uint32());
          break;
        case 5:
          message.opened = StatsDataOpened.decode(reader, reader.uint32());
          break;
        case 6:
          message.clicked = StatsDataClicked.decode(reader, reader.uint32());
          break;
        case 7:
          message.rejected = StatsDataRejected.decode(reader, reader.uint32());
          break;
        case 8:
          message.error = StatsDataError.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatsData {
    return {
      accepted: isSet(object.accepted)
        ? StatsDataAccepted.fromJSON(object.accepted)
        : undefined,
      delivered: isSet(object.delivered)
        ? StatsDataDelivered.fromJSON(object.delivered)
        : undefined,
      failed: isSet(object.failed)
        ? StatsDataFailed.fromJSON(object.failed)
        : undefined,
      bounced: isSet(object.bounced)
        ? StatsDataBounced.fromJSON(object.bounced)
        : undefined,
      opened: isSet(object.opened)
        ? StatsDataOpened.fromJSON(object.opened)
        : undefined,
      clicked: isSet(object.clicked)
        ? StatsDataClicked.fromJSON(object.clicked)
        : undefined,
      rejected: isSet(object.rejected)
        ? StatsDataRejected.fromJSON(object.rejected)
        : undefined,
      error: isSet(object.error)
        ? StatsDataError.fromJSON(object.error)
        : undefined,
    };
  },

  toJSON(message: StatsData): unknown {
    const obj: any = {};
    message.accepted !== undefined &&
      (obj.accepted = message.accepted
        ? StatsDataAccepted.toJSON(message.accepted)
        : undefined);
    message.delivered !== undefined &&
      (obj.delivered = message.delivered
        ? StatsDataDelivered.toJSON(message.delivered)
        : undefined);
    message.failed !== undefined &&
      (obj.failed = message.failed
        ? StatsDataFailed.toJSON(message.failed)
        : undefined);
    message.bounced !== undefined &&
      (obj.bounced = message.bounced
        ? StatsDataBounced.toJSON(message.bounced)
        : undefined);
    message.opened !== undefined &&
      (obj.opened = message.opened
        ? StatsDataOpened.toJSON(message.opened)
        : undefined);
    message.clicked !== undefined &&
      (obj.clicked = message.clicked
        ? StatsDataClicked.toJSON(message.clicked)
        : undefined);
    message.rejected !== undefined &&
      (obj.rejected = message.rejected
        ? StatsDataRejected.toJSON(message.rejected)
        : undefined);
    message.error !== undefined &&
      (obj.error = message.error
        ? StatsDataError.toJSON(message.error)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatsData>, I>>(
    object: I
  ): StatsData {
    const message = createBaseStatsData();
    message.accepted =
      object.accepted !== undefined && object.accepted !== null
        ? StatsDataAccepted.fromPartial(object.accepted)
        : undefined;
    message.delivered =
      object.delivered !== undefined && object.delivered !== null
        ? StatsDataDelivered.fromPartial(object.delivered)
        : undefined;
    message.failed =
      object.failed !== undefined && object.failed !== null
        ? StatsDataFailed.fromPartial(object.failed)
        : undefined;
    message.bounced =
      object.bounced !== undefined && object.bounced !== null
        ? StatsDataBounced.fromPartial(object.bounced)
        : undefined;
    message.opened =
      object.opened !== undefined && object.opened !== null
        ? StatsDataOpened.fromPartial(object.opened)
        : undefined;
    message.clicked =
      object.clicked !== undefined && object.clicked !== null
        ? StatsDataClicked.fromPartial(object.clicked)
        : undefined;
    message.rejected =
      object.rejected !== undefined && object.rejected !== null
        ? StatsDataRejected.fromPartial(object.rejected)
        : undefined;
    message.error =
      object.error !== undefined && object.error !== null
        ? StatsDataError.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseStatsDataAccepted(): StatsDataAccepted {
  return {};
}

export const StatsDataAccepted = {
  encode(
    _: StatsDataAccepted,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatsDataAccepted {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatsDataAccepted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): StatsDataAccepted {
    return {};
  },

  toJSON(_: StatsDataAccepted): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatsDataAccepted>, I>>(
    _: I
  ): StatsDataAccepted {
    const message = createBaseStatsDataAccepted();
    return message;
  },
};

function createBaseStatsDataRejected(): StatsDataRejected {
  return { reason: "" };
}

export const StatsDataRejected = {
  encode(
    message: StatsDataRejected,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.reason !== "") {
      writer.uint32(10).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatsDataRejected {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatsDataRejected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatsDataRejected {
    return {
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: StatsDataRejected): unknown {
    const obj: any = {};
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatsDataRejected>, I>>(
    object: I
  ): StatsDataRejected {
    const message = createBaseStatsDataRejected();
    message.reason = object.reason ?? "";
    return message;
  },
};

function createBaseStatsDataDelivered(): StatsDataDelivered {
  return {};
}

export const StatsDataDelivered = {
  encode(
    _: StatsDataDelivered,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatsDataDelivered {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatsDataDelivered();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): StatsDataDelivered {
    return {};
  },

  toJSON(_: StatsDataDelivered): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatsDataDelivered>, I>>(
    _: I
  ): StatsDataDelivered {
    const message = createBaseStatsDataDelivered();
    return message;
  },
};

function createBaseStatsDataFailed(): StatsDataFailed {
  return {};
}

export const StatsDataFailed = {
  encode(
    _: StatsDataFailed,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatsDataFailed {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatsDataFailed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): StatsDataFailed {
    return {};
  },

  toJSON(_: StatsDataFailed): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatsDataFailed>, I>>(
    _: I
  ): StatsDataFailed {
    const message = createBaseStatsDataFailed();
    return message;
  },
};

function createBaseStatsDataBounced(): StatsDataBounced {
  return { permanent: false, code: 0, msg: "" };
}

export const StatsDataBounced = {
  encode(
    message: StatsDataBounced,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.permanent === true) {
      writer.uint32(8).bool(message.permanent);
    }
    if (message.code !== 0) {
      writer.uint32(16).uint32(message.code);
    }
    if (message.msg !== "") {
      writer.uint32(26).string(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatsDataBounced {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatsDataBounced();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.permanent = reader.bool();
          break;
        case 2:
          message.code = reader.uint32();
          break;
        case 3:
          message.msg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatsDataBounced {
    return {
      permanent: isSet(object.permanent) ? Boolean(object.permanent) : false,
      code: isSet(object.code) ? Number(object.code) : 0,
      msg: isSet(object.msg) ? String(object.msg) : "",
    };
  },

  toJSON(message: StatsDataBounced): unknown {
    const obj: any = {};
    message.permanent !== undefined && (obj.permanent = message.permanent);
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.msg !== undefined && (obj.msg = message.msg);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatsDataBounced>, I>>(
    object: I
  ): StatsDataBounced {
    const message = createBaseStatsDataBounced();
    message.permanent = object.permanent ?? false;
    message.code = object.code ?? 0;
    message.msg = object.msg ?? "";
    return message;
  },
};

function createBaseStatsDataError(): StatsDataError {
  return { code: 0, msg: "" };
}

export const StatsDataError = {
  encode(
    message: StatsDataError,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.msg !== "") {
      writer.uint32(18).string(message.msg);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatsDataError {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatsDataError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.uint32();
          break;
        case 2:
          message.msg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatsDataError {
    return {
      code: isSet(object.code) ? Number(object.code) : 0,
      msg: isSet(object.msg) ? String(object.msg) : "",
    };
  },

  toJSON(message: StatsDataError): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.msg !== undefined && (obj.msg = message.msg);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatsDataError>, I>>(
    object: I
  ): StatsDataError {
    const message = createBaseStatsDataError();
    message.code = object.code ?? 0;
    message.msg = object.msg ?? "";
    return message;
  },
};

function createBaseStatsDataOpened(): StatsDataOpened {
  return { userAgent: "", ip: "" };
}

export const StatsDataOpened = {
  encode(
    message: StatsDataOpened,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userAgent !== "") {
      writer.uint32(10).string(message.userAgent);
    }
    if (message.ip !== "") {
      writer.uint32(18).string(message.ip);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatsDataOpened {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatsDataOpened();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userAgent = reader.string();
          break;
        case 2:
          message.ip = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatsDataOpened {
    return {
      userAgent: isSet(object.userAgent) ? String(object.userAgent) : "",
      ip: isSet(object.ip) ? String(object.ip) : "",
    };
  },

  toJSON(message: StatsDataOpened): unknown {
    const obj: any = {};
    message.userAgent !== undefined && (obj.userAgent = message.userAgent);
    message.ip !== undefined && (obj.ip = message.ip);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatsDataOpened>, I>>(
    object: I
  ): StatsDataOpened {
    const message = createBaseStatsDataOpened();
    message.userAgent = object.userAgent ?? "";
    message.ip = object.ip ?? "";
    return message;
  },
};

function createBaseStatsDataClicked(): StatsDataClicked {
  return { userAgent: "", ip: "", url: "" };
}

export const StatsDataClicked = {
  encode(
    message: StatsDataClicked,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userAgent !== "") {
      writer.uint32(10).string(message.userAgent);
    }
    if (message.ip !== "") {
      writer.uint32(18).string(message.ip);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StatsDataClicked {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatsDataClicked();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userAgent = reader.string();
          break;
        case 2:
          message.ip = reader.string();
          break;
        case 3:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StatsDataClicked {
    return {
      userAgent: isSet(object.userAgent) ? String(object.userAgent) : "",
      ip: isSet(object.ip) ? String(object.ip) : "",
      url: isSet(object.url) ? String(object.url) : "",
    };
  },

  toJSON(message: StatsDataClicked): unknown {
    const obj: any = {};
    message.userAgent !== undefined && (obj.userAgent = message.userAgent);
    message.ip !== undefined && (obj.ip = message.ip);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StatsDataClicked>, I>>(
    object: I
  ): StatsDataClicked {
    const message = createBaseStatsDataClicked();
    message.userAgent = object.userAgent ?? "";
    message.ip = object.ip ?? "";
    message.url = object.url ?? "";
    return message;
  },
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
