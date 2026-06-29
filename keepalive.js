// 使用 Node 内置原生 fetch，不再依赖 node-fetch 包
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY;

async function runKeepAlive() {
    const requestHeaders = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
    };

    try {
        const configRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_global_config`, {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify({})
        });

        const tableRes = await fetch(`${SUPABASE_URL}/rest/v1/salary_data?limit=1`, {
            method: "GET",
            headers: requestHeaders
        });

        if (configRes.ok && tableRes.ok) {
            console.log("======================================");
            console.log("✅ 保活请求全部成功！");
            console.log(`RPC接口状态码：${configRes.status}`);
            console.log(`数据表查询状态码：${tableRes.status}`);
            console.log("执行时间：", new Date().toLocaleString());
            console.log("======================================");
        } else {
            console.log("⚠️ 部分接口访问异常");
            console.log(`RPC响应码：${configRes.status}`);
            console.log(`数据表响应码：${tableRes.status}`);
        }
    } catch (error) {
        console.error("❌ 保活请求失败，错误信息：", error.message);
    }
}

runKeepAlive();
