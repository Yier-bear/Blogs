"use client";

import { useMemo, useState } from "react";
import { Activity, BarChart3, Bell, BookOpen, ChevronRight, CircleUserRound, CloudUpload, FileText, FolderKanban, Gauge, Heart, Image, LayoutDashboard, MessageCircle, MoreHorizontal, Search, Settings, ShieldAlert, Sparkles, Users, X } from "lucide-react";

type Section = "overview" | "content" | "community" | "sync" | "analytics" | "settings";
type ContentItem = { id: number; title: string; type: string; visibility: string; status: string; updated: string; sync: string };

const initialContent: ContentItem[] = [
  { id: 1, title: "AI 产品不是给界面加一个输入框", type: "长文章", visibility: "博客 + TOC", status: "已发布", updated: "今天 09:20", sync: "已同步" },
  { id: 2, title: "先验证任务，再选择模型", type: "产品手记", visibility: "博客 + TOC", status: "已发布", updated: "昨天 20:30", sync: "已同步" },
  { id: 3, title: "Agent 的信任如何被设计出来", type: "说说", visibility: "仅博客", status: "草稿", updated: "10 月 24 日", sync: "未同步" },
  { id: 4, title: "TOC 产品社区", type: "项目", visibility: "仅博客", status: "已发布", updated: "10 月 20 日", sync: "未同步" },
];

const nav: { key: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "概览", icon: LayoutDashboard },
  { key: "content", label: "个人内容", icon: FileText },
  { key: "community", label: "TOC 社区", icon: Users },
  { key: "sync", label: "同步中心", icon: CloudUpload },
  { key: "analytics", label: "数据看板", icon: BarChart3 },
  { key: "settings", label: "站点设置", icon: Settings },
];

const pageInfo: Record<Section, { title: string; description: string }> = {
  overview: { title: "早上好，ayu", description: "这里是个人博客与 TOC 社区的今日状态。" },
  content: { title: "个人内容", description: "上传、编辑并决定内容是否同步至 TOC。" },
  community: { title: "TOC 社区", description: "查看社区内容、用户与待处理事项。" },
  sync: { title: "同步中心", description: "追踪个人博客到 TOC 的内容同步任务。" },
  analytics: { title: "数据看板", description: "了解博客求职表现与社区增长。" },
  settings: { title: "站点设置", description: "管理品牌信息、个人资料和发布规则。" },
};

export default function ConsoleDemo() {
  const [section, setSection] = useState<Section>("overview");
  const [items, setItems] = useState(initialContent);
  const [query, setQuery] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  const filtered = useMemo(() => items.filter((item) => `${item.title}${item.type}${item.status}`.toLowerCase().includes(query.toLowerCase())), [items, query]);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2200); };

  const createContent = (form: FormData) => {
    const title = String(form.get("title") || "未命名内容");
    const type = String(form.get("type") || "说说");
    const visibility = String(form.get("visibility") || "仅博客");
    setItems((current) => [{ id: Date.now(), title, type, visibility, status: "已发布", updated: "刚刚", sync: visibility.includes("TOC") ? "排队中" : "未同步" }, ...current]);
    setComposerOpen(false);
    notify(visibility.includes("TOC") ? "内容已发布，同步任务已进入队列" : "内容已发布到 ayu’s blog");
  };

  return (
    <main className="console-grid min-h-screen p-3 sm:p-5 lg:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-[1500px] gap-5">
        <aside className={`console-glass fixed inset-y-3 left-3 z-40 w-64 rounded-[28px] p-4 transition lg:static lg:block lg:w-60 lg:flex-none ${mobileNav ? "translate-x-0" : "-translate-x-[110%] lg:translate-x-0"}`}>
          <div className="flex items-center justify-between px-2 py-2"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#d68a90] to-[#aa5b67] font-mono text-xs font-bold text-white shadow-lg">AY</span><div><strong className="block font-serif text-lg">ayu’s console</strong><span className="font-mono text-[8px] tracking-widest text-[#9a7e78]">CONTENT · COMMUNITY</span></div></div><button className="lg:hidden" onClick={() => setMobileNav(false)}><X size={18} /></button></div>
          <nav className="mt-8 space-y-1">{nav.map(({ key, label, icon: Icon }) => <button key={key} onClick={() => { setSection(key); setMobileNav(false); }} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${section === key ? "bg-[#bf7078] text-white shadow-lg shadow-[#bf7078]/20" : "text-[#75645f] hover:bg-white/60"}`}><Icon size={17} /><span>{label}</span>{section === key && <ChevronRight className="ml-auto" size={15} />}</button>)}</nav>
          <div className="absolute bottom-5 left-4 right-4 rounded-2xl bg-[#493d3a] p-4 text-white"><p className="font-mono text-[9px] tracking-widest text-[#e5d4cf]">DEMO MODE</p><p className="mt-2 text-xs leading-5 text-[#f3e8e4]">当前为前端演示，数据操作只保留在本次页面会话。</p></div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="console-glass flex items-center gap-3 rounded-[24px] px-4 py-3 sm:px-5"><button className="grid h-9 w-9 place-items-center rounded-xl bg-white/65 lg:hidden" onClick={() => setMobileNav(true)}>☰</button><div className="hidden flex-1 items-center gap-2 rounded-xl bg-white/55 px-3 sm:flex"><Search size={15} className="text-[#987d77]" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent py-2.5 text-xs outline-none" placeholder="搜索内容、用户或同步任务" /></div><button className="ml-auto grid h-9 w-9 place-items-center rounded-xl bg-white/60 text-[#806b66]"><Bell size={16} /></button><button onClick={() => setComposerOpen(true)} className="flex items-center gap-2 rounded-xl bg-[#bf7078] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#bf7078]/20"><Sparkles size={15} />新建内容</button><div className="hidden h-9 w-9 place-items-center rounded-xl bg-[#f1d3d0] font-mono text-xs text-[#a85e67] sm:grid">AY</div></header>

          <div className="px-1 py-7 sm:px-2"><p className="font-mono text-[9px] tracking-[.18em] text-[#b1676f]">AYU’S BLOG × TOC</p><h1 className="mt-2 font-serif text-3xl font-bold text-[#493d3a]">{pageInfo[section].title}</h1><p className="mt-2 text-sm text-[#8b7771]">{pageInfo[section].description}</p></div>

          {section === "overview" && <Overview onCreate={() => setComposerOpen(true)} onNavigate={setSection} />}
          {section === "content" && <ContentTable items={filtered} query={query} setQuery={setQuery} onCreate={() => setComposerOpen(true)} onAction={notify} />}
          {section === "community" && <Community onAction={notify} />}
          {section === "sync" && <SyncCenter onAction={notify} />}
          {section === "analytics" && <Analytics />}
          {section === "settings" && <SettingsPanel onSave={() => notify("设置已在 Demo 中保存")} />}
        </section>
      </div>

      {composerOpen && <Composer onClose={() => setComposerOpen(false)} onSubmit={createContent} />}
      {toast && <div className="fixed bottom-5 right-5 z-50 rounded-2xl bg-[#493d3a] px-5 py-3 text-xs text-white shadow-2xl">{toast}</div>}
    </main>
  );
}

function Overview({ onCreate, onNavigate }: { onCreate: () => void; onNavigate: (section: Section) => void }) {
  const stats = [{ label: "博客访问", value: "1,284", change: "+18.4%", icon: Activity }, { label: "TOC 活跃用户", value: "386", change: "+12.1%", icon: Users }, { label: "本周发布", value: "42", change: "+8", icon: FileText }, { label: "待处理举报", value: "3", change: "需关注", icon: ShieldAlert }];
  return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, change, icon: Icon }) => <article key={label} className="console-glass rounded-[24px] p-5"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f3d7d4]/70 text-[#af626b]"><Icon size={18} /></span><span className="rounded-lg bg-white/60 px-2 py-1 font-mono text-[9px] text-[#a15f66]">{change}</span></div><strong className="mt-5 block font-mono text-2xl">{value}</strong><span className="mt-1 block text-xs text-[#8b7771]">{label}</span></article>)}</div><div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]"><article className="console-glass rounded-[28px] p-6"><div className="flex items-center justify-between"><div><h2 className="font-serif text-xl font-bold">近 7 日表现</h2><p className="mt-1 text-xs text-[#8b7771]">博客访问与 TOC 内容互动</p></div><Gauge size={19} className="text-[#b56a72]" /></div><div className="mt-8 flex h-48 items-end gap-3">{[42,68,53,82,64,91,76].map((value,index)=><div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-xl bg-gradient-to-t from-[#c5757c] to-[#efc5c2]" style={{height:`${value}%`}}/><span className="font-mono text-[8px] text-[#9b827c]">{index+21}</span></div>)}</div></article><article className="console-glass rounded-[28px] p-6"><h2 className="font-serif text-xl font-bold">快捷操作</h2><div className="mt-5 space-y-2"><Quick icon={BookOpen} label="发布博客内容" onClick={onCreate}/><Quick icon={CloudUpload} label="查看同步任务" onClick={()=>onNavigate("sync")}/><Quick icon={ShieldAlert} label="处理社区举报" onClick={()=>onNavigate("community")}/><Quick icon={BarChart3} label="查看完整数据" onClick={()=>onNavigate("analytics")}/></div></article></div><div className="grid gap-5 lg:grid-cols-2"><article className="console-glass rounded-[28px] p-6"><h2 className="font-serif text-lg font-bold">最近活动</h2><div className="mt-4 space-y-4">{["文章《AI 产品不是给界面加一个输入框》同步成功","用户 @Lena 发布了一条体验设计思考","TOC 社区新增 12 位注册用户","项目「AI 产品工作台」已更新"].map((text,index)=><div key={text} className="flex gap-3"><span className="mt-1.5 h-2 w-2 rounded-full bg-[#c2757b]"/><div><p className="text-xs">{text}</p><span className="font-mono text-[8px] text-[#9a817b]">{index+1} 小时前</span></div></div>)}</div></article><article className="console-glass rounded-[28px] p-6"><h2 className="font-serif text-lg font-bold">同步状态</h2><div className="mt-5 grid grid-cols-3 gap-3 text-center"><MiniStat value="18" label="本月成功"/><MiniStat value="1" label="排队中"/><MiniStat value="0" label="失败"/></div><div className="mt-6 rounded-2xl bg-[#edf1e8] p-4 text-xs leading-6 text-[#63705f]">所有同步服务运行正常。最近一次同步完成于 3 分钟前。</div></article></div></div>
}

function ContentTable({ items, query, setQuery, onCreate, onAction }: { items: ContentItem[]; query: string; setQuery: (value: string) => void; onCreate: () => void; onAction: (message: string) => void }) {
  return <article className="console-glass overflow-hidden rounded-[28px]"><div className="flex flex-col gap-3 border-b border-[#a06e65]/10 p-5 sm:flex-row sm:items-center"><div className="flex flex-1 items-center gap-2 rounded-xl bg-white/60 px-3"><Search size={15}/><input className="w-full bg-transparent py-2.5 text-xs outline-none" value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索标题、类型或状态"/></div><button onClick={onCreate} className="rounded-xl bg-[#bf7078] px-4 py-2.5 text-xs font-bold text-white">上传 / 新建内容</button></div><div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-xs"><thead className="bg-white/30 text-[#8b7771]"><tr><th className="px-5 py-4 font-medium">内容</th><th className="px-4 py-4 font-medium">可见性</th><th className="px-4 py-4 font-medium">状态</th><th className="px-4 py-4 font-medium">TOC 同步</th><th className="px-4 py-4 font-medium">更新时间</th><th className="px-4 py-4"/></tr></thead><tbody>{items.map(item=><tr key={item.id} className="border-t border-[#a06e65]/10 hover:bg-white/30"><td className="px-5 py-4"><strong className="block font-medium">{item.title}</strong><span className="mt-1 block text-[10px] text-[#9a817b]">{item.type}</span></td><td className="px-4 py-4">{item.visibility}</td><td className="px-4 py-4"><span className={`rounded-lg px-2 py-1 ${item.status==="已发布"?"bg-[#e5eee0] text-[#5d7357]":"bg-[#f3e2c6] text-[#8b6c3c]"}`}>{item.status}</span></td><td className="px-4 py-4">{item.sync}</td><td className="px-4 py-4 text-[#8b7771]">{item.updated}</td><td className="px-4 py-4"><button onClick={()=>onAction(`已打开「${item.title}」的操作菜单`)}><MoreHorizontal size={17}/></button></td></tr>)}</tbody></table></div></article>
}

function Community({ onAction }: { onAction: (message: string) => void }) { return <div className="grid gap-5 xl:grid-cols-[1fr_.72fr]"><article className="console-glass rounded-[28px] p-6"><div className="flex items-center justify-between"><h2 className="font-serif text-xl font-bold">社区内容</h2><span className="font-mono text-[9px] text-[#9b817b]">42 TODAY</span></div><div className="mt-5 space-y-3">{["AI 搜索产品应该如何展示来源？","一次 Agent 授权失败的复盘","产品经理需要自己写 Prompt 吗？","如果 AI 产品也有情绪天气"].map((title,index)=><div key={title} className="flex items-center gap-3 rounded-2xl bg-white/45 p-4"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f0d1ce] font-mono text-[10px] text-[#a75f68]">U{index+1}</span><div className="min-w-0 flex-1"><strong className="block truncate text-xs">{title}</strong><span className="mt-1 block text-[9px] text-[#9b817b]">{12+index*7} 次互动 · {index+1} 个举报</span></div><button onClick={()=>onAction(`已查看社区内容：${title}`)}><MoreHorizontal size={17}/></button></div>)}</div></article><div className="space-y-5"><article className="console-glass rounded-[28px] p-6"><h2 className="font-serif text-lg font-bold">待处理举报</h2><strong className="mt-5 block font-mono text-4xl text-[#b76870]">3</strong><p className="mt-2 text-xs text-[#8b7771]">其中 1 条被多位用户举报</p><button onClick={()=>onAction("已进入举报处理队列")} className="mt-5 w-full rounded-xl bg-[#493d3a] py-2.5 text-xs text-white">开始处理</button></article><article className="console-glass rounded-[28px] p-6"><h2 className="font-serif text-lg font-bold">用户概览</h2><div className="mt-5 grid grid-cols-2 gap-3"><MiniStat value="1,286" label="注册用户"/><MiniStat value="386" label="周活跃"/><MiniStat value="64" label="本周新增"/><MiniStat value="28%" label="首发转化"/></div></article></div></div> }

function SyncCenter({ onAction }: { onAction: (message: string) => void }) { return <article className="console-glass rounded-[28px] p-6"><div className="flex items-center justify-between"><div><h2 className="font-serif text-xl font-bold">博客 → TOC</h2><p className="mt-1 text-xs text-[#8b7771]">个人博客是同步内容的唯一事实来源。</p></div><CloudUpload className="text-[#b66770]"/></div><div className="mt-6 space-y-3">{[{title:"AI 产品不是给界面加一个输入框",status:"同步成功",time:"3 分钟前"},{title:"Agent 产品中的信任，不来自拟人化",status:"同步成功",time:"2 天前"},{title:"AI 产品工作台",status:"排队中",time:"刚刚"}].map(task=><div key={task.title} className="flex items-center gap-4 rounded-2xl bg-white/45 p-4"><span className={`h-3 w-3 rounded-full ${task.status==="同步成功"?"bg-[#83a077]":"animate-pulse bg-[#d2a052]"}`}/><div className="flex-1"><strong className="text-xs">{task.title}</strong><p className="mt-1 font-mono text-[9px] text-[#9a817b]">{task.status} · {task.time}</p></div><button onClick={()=>onAction(`已查看「${task.title}」同步详情`)} className="rounded-lg bg-white/70 px-3 py-2 text-[10px]">详情</button></div>)}</div></article> }

function Analytics(){return <div className="grid gap-5 lg:grid-cols-3"><article className="console-glass rounded-[28px] p-6 lg:col-span-2"><h2 className="font-serif text-xl font-bold">社区增长</h2><div className="mt-8 flex h-60 items-end gap-3">{[34,45,40,58,64,70,68,79,82,91,87,96].map((v,i)=><div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-[#bd6e76] to-[#efd0cd]" style={{height:`${v}%`}}/>)}</div></article><article className="console-glass rounded-[28px] p-6"><h2 className="font-serif text-xl font-bold">求职展示效果</h2><div className="mt-6 space-y-5"><Metric icon={FolderKanban} label="项目外链点击" value="268"/><Metric icon={CircleUserRound} label="关于我访问" value="431"/><Metric icon={Heart} label="内容收藏" value="126"/><Metric icon={MessageCircle} label="联系入口点击" value="47"/></div></article></div>}

function SettingsPanel({onSave}:{onSave:()=>void}){return <form onSubmit={e=>{e.preventDefault();onSave()}} className="console-glass max-w-3xl rounded-[28px] p-6"><h2 className="font-serif text-xl font-bold">个人站点资料</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="博客名称" defaultValue="ayu’s blog"/><Field label="个人称呼" defaultValue="ayu"/><div className="sm:col-span-2"><Field label="个人简介" defaultValue="记录 AI 产品设计、Agent 工作流与从想法到原型的实践。"/></div><Field label="GitHub" defaultValue="https://github.com/Yier-bear"/><Field label="个人网站" defaultValue="https://"/></div><div className="mt-6 flex items-center justify-between rounded-2xl bg-[#f2dedb]/55 p-4"><div><strong className="text-xs">博客内容默认同步到 TOC</strong><p className="mt-1 text-[10px] text-[#8b7771]">发布时仍可单独调整可见性。</p></div><input type="checkbox" defaultChecked className="h-4 w-4 accent-[#bf7078]"/></div><button className="mt-6 rounded-xl bg-[#bf7078] px-5 py-2.5 text-xs font-bold text-white">保存设置</button></form>}

function Composer({ onClose, onSubmit }: { onClose: () => void; onSubmit: (form: FormData) => void }) { return <div className="fixed inset-0 z-50 grid place-items-center bg-[#493d3a]/35 p-4 backdrop-blur-xl"><form onSubmit={(event) => { event.preventDefault(); onSubmit(new FormData(event.currentTarget)); }} className="console-glass max-h-[92vh] w-full max-w-2xl overflow-auto rounded-[30px] p-6 sm:p-8"><div className="flex items-start justify-between"><div><p className="font-mono text-[9px] tracking-[.18em] text-[#b26770]">NEW CONTENT</p><h2 className="mt-2 font-serif text-2xl font-bold">发布到 ayu’s blog</h2></div><button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-xl bg-white/60"><X size={18}/></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><Field name="title" label="标题" placeholder="输入内容标题" required/></div><Select name="type" label="内容类型" options={["说说","产品手记","长文章","项目","照片"]}/><Select name="visibility" label="发布范围" options={["仅博客","博客 + TOC","私密草稿"]}/><div className="sm:col-span-2"><label className="mb-2 block text-[10px] text-[#8b7771]">正文（支持 Markdown）</label><textarea name="body" className="console-field min-h-44 resize-y" placeholder="写下 AI 产品思考、手记或项目故事…"/></div><div className="sm:col-span-2"><label className="mb-2 block text-[10px] text-[#8b7771]">图片与附件</label><button type="button" className="flex w-full flex-col items-center rounded-2xl border border-dashed border-[#b77a72]/30 bg-white/40 py-7 text-[#9a7e78]"><Image size={21}/><span className="mt-2 text-xs">点击或拖入图片（Demo）</span></button></div></div><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-xl bg-white/65 px-4 py-2.5 text-xs">取消</button><button className="rounded-xl bg-[#bf7078] px-5 py-2.5 text-xs font-bold text-white">立即发布</button></div></form></div> }

function Quick({icon:Icon,label,onClick}:{icon:typeof Activity;label:string;onClick:()=>void}){return <button onClick={onClick} className="flex w-full items-center gap-3 rounded-2xl bg-white/45 p-3 text-left text-xs transition hover:bg-white/75"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#f1d5d2] text-[#aa616a]"><Icon size={15}/></span>{label}<ChevronRight size={14} className="ml-auto"/></button>}
function MiniStat({value,label}:{value:string;label:string}){return <div className="rounded-2xl bg-white/45 p-3"><strong className="block font-mono text-lg">{value}</strong><span className="text-[9px] text-[#8b7771]">{label}</span></div>}
function Metric({icon:Icon,label,value}:{icon:typeof Activity;label:string;value:string}){return <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f1d5d2] text-[#aa616a]"><Icon size={16}/></span><span className="flex-1 text-xs text-[#806c67]">{label}</span><strong className="font-mono">{value}</strong></div>}
function Field({label,name,defaultValue,placeholder,required}:{label:string;name?:string;defaultValue?:string;placeholder?:string;required?:boolean}){return <label className="block"><span className="mb-2 block text-[10px] text-[#8b7771]">{label}</span><input name={name} defaultValue={defaultValue} placeholder={placeholder} required={required} className="console-field"/></label>}
function Select({label,name,options}:{label:string;name:string;options:string[]}){return <label className="block"><span className="mb-2 block text-[10px] text-[#8b7771]">{label}</span><select name={name} className="console-field">{options.map(option=><option key={option}>{option}</option>)}</select></label>}
