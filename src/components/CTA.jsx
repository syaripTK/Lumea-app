import { useNavigate } from "react-router-dom";
import { useFadeInUp } from "../hooks/useScrollAnimation";
import { ArrowRight, Book, Phone } from "lucide-react";

const CTA = () => {
  const ref = useFadeInUp();
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-10 lg:p-16 text-white overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 text-white text-xs font-bold rounded-full mb-6 uppercase tracking-wider border border-white/20">
              <Book size={16} /> Pendaftaran Dibuka
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-5">
              Mulai Perjalanan
              <br />
              Pendidikanmu Sekarang
            </h2>
            <p className="text-blue-100 text-base lg:text-lg max-w-xl mx-auto mb-10">
              Jangan lewatkan kesempatan mendaftar ke sekolah impianmu. Daftar
              sekarang sebelum kuota habis!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/registrasi")}
                className="inline-flex cursor-pointer items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold text-sm rounded-2xl hover:bg-blue-50 shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                Daftar Sekarang
                <ArrowRight size={16} />
              </button>
              <a
                href="https://wa.me/083164526153"
                target="blank"
                className="inline-flex cursor-pointer items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold text-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <Phone size={16} />
                Hubungi Kami
              </a>
            </div>

            <p className="mt-8 text-blue-200 text-xs">
              Gratis selamanya · Tanpa biaya pendaftaran · Dukungan 24/7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
