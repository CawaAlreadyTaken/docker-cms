import { QueryResultBase } from "pg";
import PostgresConnection from "./PostgresConnection";
import { ContestInfo } from "./interfaces";

export default class DB_utils {
  static postgresConnection: PostgresConnection;

  static async init(): Promise<void> {
    DB_utils.postgresConnection = await PostgresConnection.getInstance();
  }

  static async do_query(query: string, params: any[]): Promise<QueryResultBase> {
    const result: QueryResultBase = await DB_utils.postgresConnection.query(query, params);
    return result;
  }
  
  static async getContestsInfo(): Promise<ContestInfo[]> {
    const result: QueryResultBase = await DB_utils.do_query("SELECT * FROM contests", []);
    const contestInfo: ContestInfo[] = DB_utils.buildContestsInfo(result);
    return contestInfo;
  }

  static buildContestInfo(row: any): ContestInfo {
    // build contest info object from the result of the query to postgresql
    console.log("row: ", row);
    const contestInfo: ContestInfo = {
      id: row.id,
      name: row.name,
      description: row.description,
      languages: row.languages,
      start: row.start,
      stop: row.stop,
    }
    return contestInfo;
  }

  static buildContestsInfo(result: any): ContestInfo[] {
    // build contest info objects from the results of the query to postgresql
    const contestInfos: ContestInfo[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      const contestInfo: ContestInfo = DB_utils.buildContestInfo(result.rows[i]);
      contestInfos.push(contestInfo);
    }
    return contestInfos;
  }

}
