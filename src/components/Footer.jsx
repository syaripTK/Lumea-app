import { GraduationCap, Mail, Phone, MapPin, Heart, Send } from "lucide-react";
import { notyfError } from "../utils/notyf";

const footerLinks = {
  Layanan: [
    "Pendaftaran Online",
    "Cek Status",
    "Upload Dokumen",
    "Jadwal Seleksi",
  ],
  Informasi: [
    "Tentang Kami",
    "Berita & Pengumuman",
    "FAQ",
    "Kebijakan Privasi",
  ],
};

const handleLangganan = () => {
  notyfError("Mohon maaf, fitur ini masih dalam masa pengembangan");
};
const Footer = () => {
  return (
    <footer className="relative bg-[#0F172A] pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div>
                <span className="font-black text-white text-2xl tracking-tight leading-none block">
                  Lumea
                </span>
                <span className="text-[11px] text-blue-400 font-bold uppercase tracking-[0.2em]">
                  Future Ready
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-sm">
              Membangun jembatan digital menuju pendidikan masa depan yang
              inklusif dan berkualitas tinggi.
            </p>
            <div className="flex gap-4">
              {[].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 group"
                >
                  <Icon
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-slate-400 hover:text-blue-400 transition-all duration-300 flex items-center group"
                      >
                        <span className="w-0 group-hover:w-4 h-px bg-blue-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

              <h4 className="text-white font-bold text-xl mb-4 relative z-10">
                Ayo Bergabung!
              </h4>
              <p className="text-slate-400 text-sm mb-6 relative z-10 leading-relaxed">
                Dapatkan informasi kuota pendaftaran langsung di inbox kamu.
              </p>

              <form className="relative z-10">
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Email Anda"
                    className="w-full px-5 py-4 bg-slate-900/80 border border-slate-700 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={handleLangganan}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
                  >
                    Langganan Sekarang
                    <Send
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 py-10 border-y border-slate-800/50 mb-10">
          {[
            {
              icon: Mail,
              label: "Email",
              value: "info@lumea.id",
              href: "mailto:info@lumea.id",
            },
            {
              icon: Phone,
              label: "Telepon",
              value: "(021) 000-0000",
              href: "tel:+6221000000",
            },
            {
              icon: MapPin,
              label: "Alamat",
              value: "Jakarta Pusat, Indonesia",
              href: "#",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                <item.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  className="text-slate-300 font-semibold hover:text-white transition-colors"
                >
                  {item.value}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-300 font-bold">Lumea</span>. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="text-slate-100"> Ahmad S Syarif</span>

              <span>PeTIK Depok</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
