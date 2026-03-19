"use client";
import { useState } from 'react';

export default function Kontakt() {
  const [formData, setFormData] = useState({
    ime: '',
    email: '',
    poruka: ''
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Pošalji na email/WordPress
    console.log('Forma:', formData);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-32">
          <h1 className="text-7xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-8">
            Kontakt
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Besplatne konsultacije • Ponuda u 24h • Montaža širom Vojvodine
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          {/* LEVO: FORMA */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-blue-100">
            <h2 className="text-4xl font-black text-gray-900 mb-12">Pošalji upit</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-4">Ime i Prezime *</label>
                <input 
                  name="ime" 
                  required 
                  value={formData.ime}
                  onChange={handleChange}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-blue-400 focus:outline-none focus:ring-4 ring-blue-100 transition-all"
                  placeholder="Unesite ime"
                />
              </div>
              
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-4">Email adresa *</label>
                <input 
                  name="email" 
                  type="email"
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl focus:border-blue-400 focus:outline-none focus:ring-4 ring-blue-100 transition-all"
                  placeholder="vas@email.com"
                />
              </div>
              
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-4">Poruka / Projekat</label>
                <textarea 
                  name="poruka"
                  rows={6}
                  value={formData.poruka}
                  onChange={handleChange}
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl resize-vertical focus:border-blue-400 focus:outline-none focus:ring-4 ring-blue-100 transition-all"
                  placeholder="Opis projekta, dimenzije kapije, lokacija..."
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1"
                disabled={sent}
              >
                {sent ? '✅ Poruka poslata!' : '📤 Pošalji upit'}
              </button>
            </form>
          </div>

          {/* DESNO: KONTAKT INFO + MAPA */}
          <div className="space-y-12">
            {/* Telefoni */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-blue-100">
              <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
                📞 Kontakt
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    📱
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">Mobi 1</p>
                    <a href="tel:+381641234567" className="text-3xl font-black text-blue-600 hover:text-blue-700">+381 64 123 4567</a>
                  </div>
                </div>
                <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    ☎️
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">Fiksni</p>
                    <a href="tel:+381211234567" className="text-3xl font-black text-blue-600 hover:text-blue-700">+381 21 123 4567</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Adresa */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-blue-100">
              <h3 className="text-3xl font-black text-gray-900 mb-6">📍 Bregalnička 240b, Novi Sad</h3>
              <p className="text-xl text-gray-600 mb-8">Radno vreme: Pon-Pet 08-18h • Sub 09-15h</p>
              <a href="mailto:info@doorgatesistem.com" className="block text-xl font-semibold text-blue-600 hover:text-blue-700 mb-8">
                ✉️ info@doorgatesistem.com
              </a>
              {/* Google Maps */}
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2808.482748523!2d19.845!3d45.256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDE1JzIxLjQiTiAxOsKwNTAnNDguMiJF!5e0!3m2!1sen!2srs!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{border:0}}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
