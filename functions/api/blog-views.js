// Cloudflare Pages Function. Requires D1 binding BLOG_DB and table blog_views.
// CREATE TABLE IF NOT EXISTS blog_views (slug TEXT PRIMARY KEY, views INTEGER NOT NULL DEFAULT 0);
const allowed=new Set(["how-to-choose-a-hospital-in-india-en","how-to-choose-a-hospital-in-india-ar"]);
const headers={"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"};
export async function onRequest({request,env}){
 const url=new URL(request.url),slug=url.searchParams.get("slug");
 if(!allowed.has(slug))return new Response(JSON.stringify({error:"Unknown article"}),{status:400,headers});
 if(!env.BLOG_DB)return new Response(JSON.stringify({error:"View counts not configured"}),{status:503,headers});
 try{
  const db=env.BLOG_DB;
  if(request.method==="POST"){
   const origin=request.headers.get("origin");
   if(origin && new URL(origin).host!==url.host)return new Response(JSON.stringify({error:"Origin not allowed"}),{status:403,headers});
   const cookieKey="elajme_blog_"+(slug.endsWith("-ar")?"ar":"en");
   const cookies=request.headers.get("cookie")||"";
   const already=cookies.split(";").some(c=>c.trim()===cookieKey+"=1");
   if(!already)await db.prepare("INSERT INTO blog_views(slug,views) VALUES (?,1) ON CONFLICT(slug) DO UPDATE SET views=views+1").bind(slug).run();
   const row=await db.prepare("SELECT views FROM blog_views WHERE slug=?").bind(slug).first();
   const h=new Headers(headers);
   if(!already)h.append("Set-Cookie",cookieKey+"=1; Path=/; Max-Age=86400; Secure; SameSite=Lax");
   return new Response(JSON.stringify({views:row?.views??0}),{headers:h});
  }
  if(request.method!=="GET")return new Response("Method not allowed",{status:405,headers:{...headers,allow:"GET, POST"}});
  const row=await db.prepare("SELECT views FROM blog_views WHERE slug=?").bind(slug).first();
  return new Response(JSON.stringify({views:row?.views??0}),{headers});
 }catch(e){return new Response(JSON.stringify({error:"Counter unavailable"}),{status:503,headers});}
}