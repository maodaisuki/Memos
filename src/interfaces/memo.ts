type Memo = {
    memoId?: number,
    content: string,
    tags?: Array<string>,
    createdDate?: Date,
    lastModifiedDate?: Date,
    userId: number
}

export default Memo;