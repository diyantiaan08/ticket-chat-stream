import avatarRani from "@/assets/avatar-rani.jpg";
import avatarBimo from "@/assets/avatar-bimo.jpg";
import avatarSinta from "@/assets/avatar-sinta.jpg";
import avatarArif from "@/assets/avatar-arif.jpg";

export type Message = {
  id: string;
  from: "customer" | "agent";
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  email: string;
  topic: string;
  time: string;
  preview: string;
  avatar: string;
  status: "Aktif" | "Menunggu" | "Selesai";
  ticket: {
    code: string;
    title: string;
    status: string;
    priority: string;
    sla: string;
    agent: string;
    field: string;
  };
  history: { label: string; tone: "brand" | "accent" | "muted" }[];
  messages: Message[];
};

export const conversations: Conversation[] = [
  {
    id: "c1",
    name: "Rani Wijaya",
    email: "rani.w@contoh.com",
    topic: "Masalah login aplikasi",
    time: "09:24",
    preview: "Tolong bantu, saya tidak bisa masuk sejak pagi.",
    avatar: avatarRani,
    status: "Aktif",
    ticket: {
      code: "TKT-2041",
      title: "Eskalasi Helpdesk",
      status: "Dibuka",
      priority: "Tinggi",
      sla: "2 jam 10 mnt",
      agent: "Rizky A.",
      field: "Akses",
    },
    history: [
      { label: "Pelanggan menghubungi via chat", tone: "brand" },
      { label: "Eskalasi ke helpdesk 09:35", tone: "accent" },
      { label: "Penanganan agen dimulai", tone: "muted" },
    ],
    messages: [
      {
        id: "m1",
        from: "customer",
        text: "Halo, saya tidak bisa login sejak pagi. Ada kendala di sisi aplikasi?",
        time: "09:24",
      },
      {
        id: "m2",
        from: "agent",
        text: "Hai Rani, saya sudah cek dan ada gangguan sesi. Bisa coba refresh lalu login ulang ya.",
        time: "09:31",
      },
      {
        id: "m3",
        from: "customer",
        text: "Sudah saya coba, tetap gagal. Bisa dibantu lebih lanjut?",
        time: "09:33",
      },
    ],
  },
  {
    id: "c2",
    name: "Bimo Pratama",
    email: "bimo.p@contoh.com",
    topic: "Tagihan ganda bulan ini",
    time: "08:51",
    preview: "Saya tertagih dua kali untuk periode yang sama.",
    avatar: avatarBimo,
    status: "Menunggu",
    ticket: {
      code: "TKT-2038",
      title: "Peninjauan tagihan",
      status: "Diproses",
      priority: "Sedang",
      sla: "5 jam 40 mnt",
      agent: "Nadia P.",
      field: "Tagihan",
    },
    history: [
      { label: "Bot menerima laporan tagihan", tone: "brand" },
      { label: "Diteruskan ke tim tagihan", tone: "accent" },
    ],
    messages: [
      {
        id: "m1",
        from: "customer",
        text: "Saya tertagih dua kali untuk periode yang sama, mohon dicek.",
        time: "08:51",
      },
      {
        id: "m2",
        from: "agent",
        text: "Baik Pak Bimo, saya cek riwayat pembayaran Anda sekarang.",
        time: "08:55",
      },
    ],
  },
  {
    id: "c3",
    name: "Sinta Maharani",
    email: "sinta.m@contoh.com",
    topic: "Ganti paket langganan",
    time: "08:12",
    preview: "Ingin naik ke paket bisnis mulai bulan depan.",
    avatar: avatarSinta,
    status: "Aktif",
    ticket: {
      code: "TKT-2035",
      title: "Perubahan paket",
      status: "Dibuka",
      priority: "Rendah",
      sla: "1 hari",
      agent: "Fajar S.",
      field: "Langganan",
    },
    history: [
      { label: "Permintaan upgrade masuk", tone: "brand" },
      { label: "Menunggu konfirmasi pelanggan", tone: "muted" },
    ],
    messages: [
      {
        id: "m1",
        from: "customer",
        text: "Halo, saya ingin naik ke paket bisnis mulai bulan depan.",
        time: "08:12",
      },
      {
        id: "m2",
        from: "agent",
        text: "Siap Bu Sinta, saya siapkan rincian biaya paket bisnisnya.",
        time: "08:20",
      },
    ],
  },
  {
    id: "c4",
    name: "Arif Setiawan",
    email: "arif.s@contoh.com",
    topic: "Reset kata sandi",
    time: "07:40",
    preview: "Tautan reset tidak pernah masuk ke email saya.",
    avatar: avatarArif,
    status: "Selesai",
    ticket: {
      code: "TKT-2030",
      title: "Reset kata sandi",
      status: "Selesai",
      priority: "Rendah",
      sla: "Terpenuhi",
      agent: "Rizky A.",
      field: "Akses",
    },
    history: [
      { label: "Permintaan reset dibuat", tone: "brand" },
      { label: "Tautan dikirim ulang", tone: "accent" },
      { label: "Dikonfirmasi selesai", tone: "muted" },
    ],
    messages: [
      {
        id: "m1",
        from: "customer",
        text: "Tautan reset tidak pernah masuk ke email saya.",
        time: "07:40",
      },
      {
        id: "m2",
        from: "agent",
        text: "Sudah saya kirim ulang ke alamat cadangan Anda, mohon dicek ya.",
        time: "07:46",
      },
      { id: "m3", from: "customer", text: "Sudah masuk, terima kasih!", time: "07:52" },
    ],
  },
];

export type Ticket = {
  code: string;
  subject: string;
  customer: string;
  channel: string;
  agent: string;
  priority: "Tinggi" | "Sedang" | "Rendah";
  status: "Dibuka" | "Diproses" | "Menunggu" | "Selesai";
  sla: string;
  created: string;
};

export const tickets: Ticket[] = [
  {
    code: "TKT-2041",
    subject: "Tidak bisa login sejak pagi",
    customer: "Rani Wijaya",
    channel: "Chat Room",
    agent: "Rizky A.",
    priority: "Tinggi",
    status: "Dibuka",
    sla: "2j 10m",
    created: "Hari ini 09:35",
  },
  {
    code: "TKT-2038",
    subject: "Tagihan ganda periode Agustus",
    customer: "Bimo Pratama",
    channel: "Chat Room",
    agent: "Nadia P.",
    priority: "Sedang",
    status: "Diproses",
    sla: "5j 40m",
    created: "Hari ini 08:58",
  },
  {
    code: "TKT-2035",
    subject: "Permintaan upgrade paket bisnis",
    customer: "Sinta Maharani",
    channel: "Chat Room",
    agent: "Fajar S.",
    priority: "Rendah",
    status: "Menunggu",
    sla: "1 hari",
    created: "Hari ini 08:20",
  },
  {
    code: "TKT-2031",
    subject: "API rate limit terlalu ketat",
    customer: "PT Warna Digital",
    channel: "Email",
    agent: "Nadia P.",
    priority: "Tinggi",
    status: "Diproses",
    sla: "45m",
    created: "Kemarin 17:12",
  },
  {
    code: "TKT-2030",
    subject: "Reset kata sandi tidak terkirim",
    customer: "Arif Setiawan",
    channel: "Chat Room",
    agent: "Rizky A.",
    priority: "Rendah",
    status: "Selesai",
    sla: "Terpenuhi",
    created: "Kemarin 07:46",
  },
];

export type HandoverItem = {
  code: string;
  customer: string;
  summary: string;
  category: string;
  from: string;
  to: string;
  waiting: string;
  avatar: string;
};

export const handovers: HandoverItem[] = [
  {
    code: "TKT-2041",
    customer: "Rani Wijaya",
    summary: "Helpdesk selesai memulihkan sesi, siap dikembalikan ke agen chat.",
    category: "Akses",
    from: "Helpdesk · Ravi",
    to: "Chat Room · Rizky A.",
    waiting: "4 mnt",
    avatar: avatarRani,
  },
  {
    code: "TKT-2038",
    customer: "Bimo Pratama",
    summary: "Refund disetujui, pelanggan perlu konfirmasi lewat chat.",
    category: "Tagihan",
    from: "Helpdesk · Mira",
    to: "Chat Room · Nadia P.",
    waiting: "11 mnt",
    avatar: avatarBimo,
  },
  {
    code: "TKT-2035",
    customer: "Sinta Maharani",
    summary: "Rincian paket bisnis siap dijelaskan kembali oleh agen.",
    category: "Langganan",
    from: "Helpdesk · Ravi",
    to: "Chat Room · Fajar S.",
    waiting: "26 mnt",
    avatar: avatarSinta,
  },
];

export const hourlyVolume = [
  { hour: "08", value: 35 },
  { hour: "09", value: 55 },
  { hour: "10", value: 80 },
  { hour: "11", value: 100 },
  { hour: "12", value: 65 },
  { hour: "13", value: 48 },
];

export const agentPerformance = [
  { name: "Rizky A.", role: "Agent", resolution: 94, chats: 62, avg: "1m 52s" },
  { name: "Nadia P.", role: "Helpdesk", resolution: 88, chats: 47, avg: "2m 31s" },
  { name: "Fajar S.", role: "Agent", resolution: 79, chats: 39, avg: "3m 04s" },
  { name: "Mira K.", role: "Helpdesk", resolution: 72, chats: 28, avg: "3m 48s" },
];
