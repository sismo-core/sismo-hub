export enum ExecutionState {
  PENDING = 'QUERY_STATE_PENDING',
  EXECUTING = 'QUERY_STATE_EXECUTING',
  FAILED = 'QUERY_STATE_FAILED',
  COMPLETED = 'QUERY_STATE_COMPLETED',
  CANCELLED = 'QUERY_STATE_CANCELLED',
  EXPIRED = 'QUERY_STATE_EXPIRED',
}

export type QueryParams = Record<string, string>;

export type ExecuteQuery = {
  execution_id: string;
  state: ExecutionState;
};

export interface ExecutionStatus extends ExecuteQuery {
  query_id: number;
  submitted_at: Date;
  expires_at: Date;
  execution_started_at: Date;
  execution_ended_at?: Date;
}

export interface ExecutionStatusComplete extends ExecutionStatus {
  result_metadata?: {
    column_names: string[];
    result_set_bytes: number;
    total_row_count: number;
    datapoint_count: number;
    pending_time_millis: number;
    execution_time_millis: number;
  };
}

export interface ExecutionResults extends ExecutionStatus {
  execution_ended_at: Date;
  result: {
    metadata: {
      column_names: string[];
      result_set_bytes: number;
      total_row_count: number;
      datapoint_count: number;
      pending_time_millis: number;
      execution_time_millis: number;
    };
    rows: Row[];
  };
}

//dynamic Row type only interested in the address field
export interface Row {
  addressField: string;
  [key: string]: any;
}
