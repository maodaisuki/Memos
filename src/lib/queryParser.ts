import QueryMap from "@/interfaces/query";

const contentRegex1 = /(?<=content:).*?(?=\s)/;
const contentRegex2 = /(?!userId:|username:|memoId:|content:|tag:)(?<=\s).*?(?=\s)/;
const usernameRegex = /(?<=username:).*?(?=\s)/;
const userIdRegex = /(?<=userId:).*?(?=\s)/;
const tagRegex = /(?<=tag:).*?(?=\s)/;
const memoIdRegex = /(?<=memoId:).*?(?=\s)/;

function queryParser(query: string) {
    query = ' ' + query + ' ';
    // 只匹配第一次
    let content = '';
    if(query.match(contentRegex2)) {
        content = query.match(contentRegex2) ? query.match(contentRegex2)![0] : '';
    }
    else {
        content = query.match(contentRegex1) ? query.match(contentRegex1)![0] : '';
    }
    const username = query.match(usernameRegex) ? query.match(usernameRegex)![0] : '';
    const userId = query.match(userIdRegex) ? query.match(userIdRegex)![0] : '';
    const tag = query.match(tagRegex) ? query.match(tagRegex)![0] : '';
    const memoId = query.match(memoIdRegex) ? query.match(memoIdRegex)![0] : '';
    // -1 匹配全员
    const result: QueryMap = {
        content: content,
        username: username,
        userId: parseInt(userId, 10) || -1,
        tag: tag,
        memoId: parseInt(memoId, 10) || -1,
    }
    // if(content.length == 0 && userId.length == 0 && username.length == 0 && tag.length == 0 && memoId.length == 0) {
    //     return null;
    // }
    return result;
}

// console.log(queryParser("userId:userId username:user memoId:9 content"));
export {
    queryParser
}