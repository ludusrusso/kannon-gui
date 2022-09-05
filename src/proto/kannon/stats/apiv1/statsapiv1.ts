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
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Stats } from "../types/stats";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kannon";

export interface GetStatsReq {
  domain: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  skip: number;
  take: number;
}

export interface GetStatsRes {
  total: number;
  stats: Stats[];
}

function createBaseGetStatsReq(): GetStatsReq {
  return {
    domain: "",
    fromDate: undefined,
    toDate: undefined,
    skip: 0,
    take: 0,
  };
}

export const GetStatsReq = {
  encode(
    message: GetStatsReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    if (message.fromDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.fromDate),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.toDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.toDate),
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.skip !== 0) {
      writer.uint32(32).uint32(message.skip);
    }
    if (message.take !== 0) {
      writer.uint32(40).uint32(message.take);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStatsReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStatsReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domain = reader.string();
          break;
        case 2:
          message.fromDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.toDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.skip = reader.uint32();
          break;
        case 5:
          message.take = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetStatsReq {
    return {
      domain: isSet(object.domain) ? String(object.domain) : "",
      fromDate: isSet(object.fromDate)
        ? fromJsonTimestamp(object.fromDate)
        : undefined,
      toDate: isSet(object.toDate)
        ? fromJsonTimestamp(object.toDate)
        : undefined,
      skip: isSet(object.skip) ? Number(object.skip) : 0,
      take: isSet(object.take) ? Number(object.take) : 0,
    };
  },

  toJSON(message: GetStatsReq): unknown {
    const obj: any = {};
    message.domain !== undefined && (obj.domain = message.domain);
    message.fromDate !== undefined &&
      (obj.fromDate = message.fromDate.toISOString());
    message.toDate !== undefined && (obj.toDate = message.toDate.toISOString());
    message.skip !== undefined && (obj.skip = Math.round(message.skip));
    message.take !== undefined && (obj.take = Math.round(message.take));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetStatsReq>, I>>(
    object: I
  ): GetStatsReq {
    const message = createBaseGetStatsReq();
    message.domain = object.domain ?? "";
    message.fromDate = object.fromDate ?? undefined;
    message.toDate = object.toDate ?? undefined;
    message.skip = object.skip ?? 0;
    message.take = object.take ?? 0;
    return message;
  },
};

function createBaseGetStatsRes(): GetStatsRes {
  return { total: 0, stats: [] };
}

export const GetStatsRes = {
  encode(
    message: GetStatsRes,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    for (const v of message.stats) {
      Stats.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStatsRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetStatsRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.uint32();
          break;
        case 2:
          message.stats.push(Stats.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetStatsRes {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      stats: Array.isArray(object?.stats)
        ? object.stats.map((e: any) => Stats.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetStatsRes): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    if (message.stats) {
      obj.stats = message.stats.map((e) => (e ? Stats.toJSON(e) : undefined));
    } else {
      obj.stats = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetStatsRes>, I>>(
    object: I
  ): GetStatsRes {
    const message = createBaseGetStatsRes();
    message.total = object.total ?? 0;
    message.stats = object.stats?.map((e) => Stats.fromPartial(e)) || [];
    return message;
  },
};

export type StatsApiV1Service = typeof StatsApiV1Service;
export const StatsApiV1Service = {
  getStats: {
    path: "/kannon.StatsApiV1/GetStats",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetStatsReq) =>
      Buffer.from(GetStatsReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetStatsReq.decode(value),
    responseSerialize: (value: GetStatsRes) =>
      Buffer.from(GetStatsRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetStatsRes.decode(value),
  },
} as const;

export interface StatsApiV1Server extends UntypedServiceImplementation {
  getStats: handleUnaryCall<GetStatsReq, GetStatsRes>;
}

export interface StatsApiV1Client extends Client {
  getStats(
    request: GetStatsReq,
    callback: (error: ServiceError | null, response: GetStatsRes) => void
  ): ClientUnaryCall;
  getStats(
    request: GetStatsReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetStatsRes) => void
  ): ClientUnaryCall;
  getStats(
    request: GetStatsReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetStatsRes) => void
  ): ClientUnaryCall;
}

export const StatsApiV1Client = makeGenericClientConstructor(
  StatsApiV1Service,
  "kannon.StatsApiV1"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): StatsApiV1Client;
  service: typeof StatsApiV1Service;
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
