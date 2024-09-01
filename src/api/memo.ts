'use server'
import { Memo } from "@/interfaces/memo";
import instance from "./instance";
import { cookies } from "next/headers";

const header = {
    'Authorization': `Bearer ${cookies().get('MAOJI-Token')?.value || ''}`
}

async function updateMemo(memo: Memo) {
    // console.log(memo.createdDate);
    const { data, error } = await instance.post(
        `/Memo`,
        {
            memoId: memo.memoId,
            content: memo.content,
            tags: memo.tags,
            userId: memo.userId,
            cretedDate: memo.createdDate,
            lastModifiedDate: memo.lastModifiedDate,
        },
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
        console.log(`[Post Memo 错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error }
    })
    return { data, error };
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
        const data = res.data;
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

async function getMemoList(page: number, limit: number = 20) {
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

async function deleteMemoById(id: number) {
    const { data, error } = await instance.delete(
        `/Memo?memoId=${id}`,
        {
            headers: header
        }
    )
    .then((res) => {
        if(res.data.statusCode == 400) {
            const data = null;
            const error = null;
            return { data, error };
        }
        else {
            const data = res.data;
            const error = null;
            return { data, error };
        }
    })
    .catch((e) => {
        console.log(`[删除 Memo 错误]: ${e.message}`);
        const data = null;
        const error = e.message;
        return { data, error };
    });
    return { data, error };
}

export {
    getMemoById,
    getMemoList,
    postMemo,
    updateMemo,
    deleteMemoById
}