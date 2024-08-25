'use server'
import { Memo } from "@/interfaces/memo";
import instance from "./instance";
import { cookies } from "next/headers";

const header = {
    'Authorization': `Bearer ${cookies().get('MAOJI-Token')?.value || ''}`
}

async function postMemo(memo: Memo) {
    // console.log(memo);
    const { data, error } = await instance.post(
        `/Memo`,
        {
            content: memo.content,
            tags: memo.tags,
            userId: memo.userId
        },
        {
            headers: header
        }
    )
    .then((res) => {
        const data = res.data.statusCode == 200 ? res.data : null;
        const error = null;
        return { data, error }
    })
    .catch((e) => {
        console.log(`[Post Memo 错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error }
    })
    return { data, error };
}

async function getMemoList(page: number, limit: number = 10) {
    const { data, error } = await instance.get(
        `/Memo/trends?page=${page}&pageSize=${limit}`,
        {
            headers: header
        }
    )
    .then((res) => {
        const data = res.data;
        const error = null;
        return { data, error }
    })
    .catch((e) => {
        console.log(`[获取 Memo 列表错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error }
    });
    return { data, error };
}

async function getMemoById(id: number) {
    const { data, error } = await instance.get(
        `/Memo?memoId=${id}`,
        {
            headers: header
        }
    )
    .then((res) => {
        const data = res.data;
        const error = null;
        return { data, error }
    })
    .catch((e) => {
        console.log(`[获取 Memo 错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error };
    });
    return { data, error };
}

export {
    getMemoById,
    getMemoList,
    postMemo
}