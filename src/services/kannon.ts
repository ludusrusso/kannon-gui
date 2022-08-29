import * as api from "../proto/kannon/api";
import * as statsv1api from "../proto/stats/apiv1/apiv1";
import { CreateClientContructor } from "./grpc-promisify";

export const NewKannonClient = CreateClientContructor(api.ApiClient);
export const NewKannonStatsV1Client = CreateClientContructor(
  statsv1api.StatsApiV1Client
);
