import * as api from "../proto/kannon/admin/apiv1/adminapiv1";
import * as statsv1api from "../proto/kannon/stats/apiv1/statsapiv1";
import { CreateClientContructor } from "./grpc-promisify";

export const NewKannonClient = CreateClientContructor(api.ApiClient);
export const NewKannonStatsV1Client = CreateClientContructor(
  statsv1api.StatsApiV1Client
);
