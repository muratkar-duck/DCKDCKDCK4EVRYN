'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProducerRequestPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    genre: '',
    duration: '',
    description: '',
    deadline: '',
    budget: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔒 Şimdilik sadece uyarı veriyoruz
    alert('İlan başarıyla oluşturuldu!');
    router.push('/dashboard/producer/requests');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">📣 Yeni İlan Oluştur</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">Başlık</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded-lg p-2"
            required
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Tür</label>
            <select
              name="genre"
              className="w-full border rounded-lg p-2"
              required
              onChange={handleChange}
            >
              <option value="">Seçiniz</option>
              <option>Dram</option>
              <option>Gerilim</option>
              <option>Komedi</option>
              <option>Bilim Kurgu</option>
              <option>Belgesel</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Süre</label>
            <select
              name="duration"
              className="w-full border rounded-lg p-2"
              required
              onChange={handleChange}
            >
              <option value="">Seçiniz</option>
              <option>Kısa Film</option>
              <option>Uzun Metraj</option>
              <option>Mini Dizi</option>
              <option>Dizi</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Açıklama</label>
          <textarea
            name="description"
            className="w-full border rounded-lg p-2"
            rows={4}
            required
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              Teslim Tarihi
            </label>
            <input
              type="date"
              name="deadline"
              className="w-full border rounded-lg p-2"
              required
              onChange={handleChange}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Bütçe</label>
            <input
              type="text"
              name="budget"
              placeholder="Örn: 100.000₺"
              className="w-full border rounded-lg p-2"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary">
            Yayınla
          </button>
        </div>
      </form>
    </div>
  );
}
