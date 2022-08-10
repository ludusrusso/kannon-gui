import * as api from "../proto/kannon/api";
import { CreateClientContructor } from "./grpc-promisify";

export const NewKannonClient = CreateClientContructor(api.ApiClient);
