export type Memo = {
    memoId?: number,
    content: string,
    tags?: Array<string>,
    createdDate?: Date,
    lasteModifiedDate?: Date,
    userId: number
}