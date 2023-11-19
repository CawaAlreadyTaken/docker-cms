export interface ContestInfo {
  id: string,
  name: string,
  description: string,
  languages: string,
  start: string,
  stop: string,
}

export interface SubmissionInfo {
  id: number,
  name: string,
  contest_id: number,
  count: number
}